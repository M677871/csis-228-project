const quizResultService = require("../services/quizResultService");
const Result = require("../models/quizResult");
const moment = require('moment');
class QuizResultController {
  static async getAllResults(req, res) {
    try {
      const results = await quizResultService.getAllQuizResults();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getResultById(req, res) {
    try {
      const { id } = req.params;
      const result = await quizResultService.getQuizResultById(id);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

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
