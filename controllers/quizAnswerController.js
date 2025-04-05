const quizAnswerService = require('../services/quizAnswerService');
const Answer = require ('../models/quizAnswerModel');

/**
 * @class QuizAnswerController
 * @description This class handles operations related to quiz answers, 
 * including retrieving, creating, updating, and deleting answers.
 */

class QuizAnswerController {

  /**
   * @async
   * @description Retrieves all answers for quizzes.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing all quiz answers.
   */

    static async getAllAnswers(req, res) {
        try {
            const answers = await quizAnswerService.getAllQuizAnswers();
            res.status(200).json(answers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Retrieves a specific answer by its unique ID.
   * @param {Object} req - The request object containing the answer ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the answer data.
   */

    static async getAnswerById(req, res) {
        try {
            const {id}= req.params;
            const answer = await quizAnswerService.getQuizAnswerById(id);
            
            res.status(200).json(answer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Creates a new answer for a specific quiz question.
   * @param {Object} req - The request object containing the answer data (questionId, answerText, answerType, isCorrect).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the created answer.
   */

    static async createAnswer(req, res) {
        try {
            const {questionId, answerText,answerType, isCorrect} =req.body;
            const newAnswer = new Answer(0,questionId, answerText,answerType, isCorrect);
            const savedAnswer = await quizAnswerService.createQuizAnswer(newAnswer);
          return res.status(201).json({message:`Answer created successufly`,result:savedAnswer});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Updates an existing answer for a specific quiz question by its unique ID.
   * @param {Object} req - The request object containing the answer ID and updated data (questionId, answerText, answerType, isCorrect).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated answer.
   */

    static async updateAnswer(req, res) {
        try {
            const {id}= req.params;
            const {questionId, answerText,answerType, isCorrect} =req.body;
            let answer = new Answer(id,questionId, answerText,answerType, isCorrect);
            const updatedAnswer = await quizAnswerService.updateQuizAnswer(answer);
            
          return res.status(200).json({message:`Answer updated successufly`,result:updatedAnswer});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Deletes an answer by its unique ID.
   * @param {Object} req - The request object containing the answer ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message.
   */

    static async deleteAnswer(req, res) {
        try {
            const {id}= req.params;
            const deletedAnswer = await quizAnswerService.deleteQuizAnswer(id);
            
            res.status(200).json({ message: 'Answer deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = QuizAnswerController;