const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
const bodyParser = require("body-parser");
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


app.use(cors());
app.use(bodyParser.json());
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