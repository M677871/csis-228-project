const quizQuestionService = require("../services/quizQuestionService");
const Question = require("../models/quizQuestionModel");
const moment = require('moment');
class QuizQuestionController {
  static async getAllQuestions(req, res) {
    try {
      const questions = await quizQuestionService.getAllQuizQuestions();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getQuestionById(req, res) {
    try {
      const { id } = req.params;
      
      const question = await quizQuestionService.getQuizQuestionById(id);
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createQuestion(req, res) {
    try {
      const { quizId, questionText } = req.body;
      const newQuestion = new Question(
        0,
       
        quizId,
        questionText,
        moment().format("YYYY-MM-DD")
      );
      const savedQuestion = await quizQuestionService.createQuizQuestion(
        newQuestion
      );
      res.status(201).json({message:`question created successufly`,result:savedQuestion});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    
  }

  static async updateQuestion(req, res) {
    try {
        const { id } = req.params;
      const { quizId, questionText } = req.body;
      let question = new Question(id,quizId, questionText ,moment().format('YYYY-MM-DD'));
      const updatedQuestion = await quizQuestionService.updateQuizQuestion(
       question
      );
      
      res.status(200).json({message:`question updated successufly`,result:updatedQuestion});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteQuestion(req, res) {
    try {
        const { id } = req.params;
      await quizQuestionService.deleteQuizQuestion(
      id
      );
      
      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = QuizQuestionController;
