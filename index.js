const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const methodOverride = require('method-override');

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

const courses = require('./services/courseService');
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use(session({
    secret: process.env.SESSION_SECRET || 'a_very_secret_key_for_your_session', 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

app.use('/' , authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/instuctor',instructorRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/course',courseRoutes);
app.use('/api/quiz',quizRoutes);
app.use('/api/enrollement',enrollementRoutes);
app.use('/api/material',courseMaterialRoutes);
app.use('/api/answer',answerRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/question',questionRoutes);
app.use('/api/result',resultRoutes);


app.get('/' , async (req , res) => {
    try{
    // const coursesList = await courses.getAllCourses();
    res.render('home.ejs', { title: 'Home' });
    }catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get ('/createCourse' , (req , res) => {
    try{
    res.render('createCourse.ejs');
    }catch(e){
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');  
    }
});

app.get('/instructor', (req, res) => {
    try{
    res.render('instructorView.ejs');
    }
    catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/student', (req, res) => {
    try{
    res.render('studentView.ejs');
    }
    catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/quiz', (req, res) => {
    try{
    res.render('createQuizz.ejs');
    }
    catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/question', (req, res) => {
    try{
    res.render('createQuizQuestion.ejs');
    }
    catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/answer', (req, res) => {
    try{
    res.render('createQuizAnswer.ejs');
    }
    catch (error) {
        console.error('Error in answer:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/enrollement', (req, res) => {
    try{
    res.render('createEnrollement.ejs');
    }
    catch (error) {
        console.error('Error in erollement:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/material', (req, res) => {
    try{
    res.render('courseMaterial.ejs');
    }
    catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/admin', (req, res) => {
    try{
    res.render('adminView.ejs');
    }
    catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get ('/users' , (req , res) => {
    try{
    res.render('users.ejs');
    }catch(e){
        console.error('Error in getting users :', error);
        res.status(500).send('Internal Server Error');  
    }
});

app.get('/changePassword', (req, res) => {
    try{
    res.render('changePassword.ejs');
    }
    catch (error) {
        console.error('Error changing pass:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/editUser', (req, res) => {
    try {
      res.render('editUsers.ejs'); 
    } catch (error) {
      console.error('Error in edit user:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





/*
    const db = require('./config/db');

    const test = async () => {
    try{
        await db.getConnection();
        console.log('Database connected');
    } catch (error){
        console.log('Database connection failed');
        throw new Error(error);
    }
}

test();

*/