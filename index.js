const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Import controllers and their middleware
const { StudentController, requireStudentLogin } = require("./controllers/studentController");
const { InstructorController, requireInstructorLogin } = require("./controllers/instructorController");
// const { AdminController, requireAdminLogin } = require("./controllers/adminController"); // Keep commented until ready

const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const courseMaterialRoutes = require('./routes/courseMaterialRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const enrollementRoutes = require('./routes/enrollementRoutes');
const quizRoutes = require('./routes/quizRoutes');
const answerRoutes = require('./routes/quizAnswerRoutes');
const questionRoutes = require('./routes/quizQuestionRoutes');
const resultRoutes = require('./routes/quizResultRoutes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(methodOverride('_method')); 

// Session Middleware (MUST be before flash and custom locals middleware)
app.use(session({
    secret: process.env.SESSION_SECRET || 'a_very_secret_key_for_your_session', //
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    console.log(`[GLOBAL MIDDLEWARE] Request URL: ${req.url}, Method: ${req.method}, User in session: ${req.session.user ? req.session.user.email : 'None'}`);
    next();
});


app.use('/student', studentRoutes);     // Handles /student/dashboard, /student/my-courses etc.
app.use('/instructor', instructorRoutes); // Handles /instructor/dashboard, /instructor/create-course etc.
// app.use('/admin', adminRoutes); // Uncomment when admin routes/controller are ready



app.use('/', authRoutes); // Handles /login, /signup, /logout



app.use('/api/users', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/enrollement', enrollementRoutes);
app.use('/api/material', courseMaterialRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/result', resultRoutes);


// 4. Other General Frontend Routes (render EJS views, less specific than dashboards)
// These routes for rendering forms or other general pages should come before the catch-all home route.
app.get('/createCourse', (req, res) => {
    console.log('[GET /createCourse] Rendering createCourse.ejs');
    try { res.render('createCourse.ejs', { user: req.session.user }); } catch (e) { console.error('Error rendering createCourse:', e); res.status(500).send('Internal Server Error'); }
});

app.get('/quiz', (req, res) => {
    console.log('[GET /quiz] Rendering createQuizz.ejs');
    try { res.render('createQuizz.ejs', { user: req.session.user }); } catch (error) { console.error('Error rendering createQuizz:', error); res.status(500).send('Internal Server Error'); }
});
app.get('/question', (req, res) => {
    console.log('[GET /question] Rendering createQuizQuestion.ejs');
    try { res.render('createQuizQuestion.ejs', { user: req.session.user }); } catch (error) { console.error('Error rendering createQuizQuestion:', error); res.status(500).send('Internal Server Error'); }
});

app.get('/answer', (req, res) => {
    console.log('[GET /answer] Rendering createQuizAnswer.ejs');
    try { res.render('createQuizAnswer.ejs', { user: req.session.user }); } catch (error) { console.error('Error in answer:', error); res.status(500).send('Internal Server Error'); }
});

app.get('/enrollement', (req, res) => {
    console.log('[GET /enrollement] Rendering createEnrollement.ejs');
    try { res.render('createEnrollement.ejs', { user: req.session.user }); } catch (error) { console.error('Error in enrollement:', error); res.status(500).send('Internal Server Error'); }
});

app.get('/material', (req, res) => {
    console.log('[GET /material] Rendering courseMaterial.ejs');
    try { res.render('courseMaterial.ejs', { user: req.session.user }); } catch (error) { console.error('Error fetching material:', error); res.status(500).send('Internal Server Error'); }
});

app.get('/users', (req, res) => {
    console.log('[GET /users] Handling users route');
    if (req.session.user && req.session.user.userType === 'admin') {
        try { res.render('users.ejs', { user: req.session.user, users: [], errorMessage: null }); } catch (e) { console.error('Error in getting users :', e); res.status(500).send('Internal Server Error'); }
    } else {
        req.flash('error', 'You must be an admin to view this page.');
        res.redirect('/login');
    }
});

app.get('/changePassword', (req, res) => {
    console.log('[GET /changePassword] Rendering changePassword.ejs');
    try { res.render('changePassword.ejs', { user: req.session.user }); } catch (error) { console.error('Error changing pass:', error); res.status(500).send('Internal Server Error'); }
});

app.get('/editUser', (req, res) => {
    console.log('[GET /editUser] Rendering editUsers.ejs');
    try { res.render('editUsers.ejs', { user: req.session.user, errorMessage: null }); } catch (error) { console.error('Error in edit user:', error); res.status(500).send('Internal Server Error'); }
});


// 5. Catch-all Home Page (Lowest priority for frontend routes)
// This should be the absolute last `app.get` route before error handlers.
app.get('/', async (req, res) => {
    console.log('[GET /] Rendering home.ejs (This should only happen if no other route matched)');
    try {
        res.render('home.ejs', { title: 'Home', user: req.session.user });
    } catch (error) {
        console.error('Error fetching data for home page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Global Error Handling Middleware (always last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
