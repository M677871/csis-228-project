const quizService = require('../services/quizService');
const moment = require('moment');
const Quiz = require('../models/quizModel');

/**
 * @class QuizController
 * @description This class handles operations related to quizzes 
 * such as retrieving, creating, updating, and deleting quizzes.
 */

class QuizController {

  /**
   * @async
   * @description Retrieves all quizzes.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing all quizzes.
   */

    static async getAllQuizzes(req, res) {
        try {
            const quizzes = await quizService.getAllQuizzes();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Retrieves a specific quiz by its unique ID.
   * @param {Object} req - The request object containing the quiz ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the quiz data.
   */

    static async getQuizById(req, res) {
        try {
            const {id}=req.params;
            const quiz = await quizService.getQuizById(id);
          return  res.status(200).json(quiz);
        } catch (error) {
         return   res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Creates a new quiz based on the provided data.
   * @param {Object} req - The request object containing the courseId, quizName, and quizDescription.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the created quiz.
   */

    static async createQuiz(req, res) {
        try {
            const{courseId, quizName, quizDescription} = req.body;
           

            let quiz = new Quiz(0, courseId, quizName, quizDescription, moment().format('YYYY-MM-DD'));
            const newQuiz = await quizService.createQuiz(quiz);
            res.status(201).json({message:`quiz created successufly`,result:newQuiz});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Updates an existing quiz by its unique ID.
   * @param {Object} req - The request object containing the quiz ID and updated data (courseId, quizName, quizDescription).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated quiz.
   */

    static async updateQuiz(req, res) {
        try {
            const {id}=req.params;
           
            const{courseId, quizName, quizDescription} = req.body;
          
            let quiz = new Quiz(id,courseId, quizName, quizDescription,moment().format('YYYY-MM-DD'));
            const updatedQuiz = await quizService.updateQuiz(quiz);
           
            res.status(200).json({message:`quiz updated successufly`,result:updatedQuiz});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Deletes a quiz by its unique ID.
   * @param {Object} req - The request object containing the quiz ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message.
   */

    static async deleteQuiz(req, res) {
        try {
            const {id}=req.params;
           
            const deletedQuiz = await quizService.deleteQuiz(id);
            res.status(200).json({ message: 'Quiz deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
/*
    static async loadquizzesView(req, res) {
        try {
          
          const cats = await categoryService.getAllCategories();
    
          
          const categories = [];
          for (const cat of cats) {
            const courses = await categoryService.getCategoryCourses(cat.categoryId);
            if (courses.length) {
              categories.push({ category: cat, courses });
            }
          }
    
          return res.render('courses', { categories });
        } catch (error) {
          console.error("Error fetching category courses:", error);
          return res.status(500).send("Internal Server Error");
        }
      }
*/
    static showQuizzForm(req, res) {
        try {
          
        res.render("createQuizz.ejs", { error: null });
        }
        catch (error) {
          console.error("Error rendering course form:", error);
          return res.status(500).send("Internal Server Error");
        }
      }
      
      static async createQuizzForm(req, res) {
        try {
            const{courseId, quizName, quizDescription} = req.body;
           

            let quiz = new Quiz(0, courseId, quizName, quizDescription, moment().format('YYYY-MM-DD'));
            const newQuiz = await quizService.createQuiz(quiz);
          
          return res.redirect("/api/material/create-material");
        } catch (error) {
          console.error("Error during course creation:", error);
          return res.render("createCourse.ejs", {
            error: "Course creation failed. Please try again.",
          });
        }
      }
}

module.exports = QuizController;