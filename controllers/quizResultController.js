const quizResultService = require("../services/quizResultService");
const Result = require("../models/quizResult");
const moment = require('moment');

/**
 * @class QuizResultController
 * @description This class handles all operations related to quiz results,
 *  such as retrieving, creating, updating, and deleting quiz results.
 */

class QuizResultController {

  /**
   * @async
   * @description Retrieves all quiz results from the system.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with all quiz results.
   */

  static async getAllResults(req, res) {
    try {
      const results = await quizResultService.getAllQuizResults();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a quiz result by its unique ID.
   * @param {Object} req - The request object containing the result ID.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the quiz result.
   */

  static async getResultById(req, res) {
    try {
      const { id } = req.params;
      const result = await quizResultService.getQuizResultById(id);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Creates a new quiz result based on the provided data.
   * @param {Object} req - The request object containing quizId, studentId, and score.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the created quiz result.
   */

  static async createResult(req, res) {
    try {
      const { quizId, studentId, score } = req.body;
      const newResult = new Result(
        0,
        quizId,
        studentId,
        score,
        moment().format("YYYY-MM-DD")
      );
      const savedResult = await quizResultService.createQuizResult(newResult);
      res.status(201).json({ message: "Result created successfully", result: savedResult });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Updates an existing quiz result by its unique ID.
   * @param {Object} req - The request object containing the result ID and updated data (quizId, studentId, score).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated quiz result.
   */

  static async updateResult(req, res) {
    try {
      const { id } = req.params;
      const { quizId, studentId, score } = req.body;
      let result = new Result(
        id,
        quizId,
        studentId,
        score,
        moment().format("YYYY-MM-DD")
      );
      const updatedResult = await quizResultService.updateQuizResult(result);
return res.status(200).json({ message: "Result updated successfully", result: updatedResult });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Deletes a quiz result by its unique ID.
   * @param {Object} req - The request object containing the result ID.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message.
   */

  static async deleteResult(req, res) {
    try {
      const { id } = req.params;
      const deletedResult = await quizResultService.deleteQuizResult(id);

      res.status(200).json({ message: "Result deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = QuizResultController;
