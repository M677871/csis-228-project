const quizAnswerService = require('../services/quizAnswerService');
const Answer = require ('../models/quizAnswerModel');
class QuizAnswerController {
    static async getAllAnswers(req, res) {
        try {
            const answers = await quizAnswerService.getAllQuizAnswers();
            res.status(200).json(answers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAnswerById(req, res) {
        try {
            const {id}= req.params;
            const answer = await quizAnswerService.getQuizAnswerById(id);
            
            res.status(200).json(answer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

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