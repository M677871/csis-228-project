const quizAnswerRepository = require('../repositories/quizAnswerRepository');
const quizQuestionRepository = require('../repositories/quizQuestionRepository');

class QuizAnswerService {
    static async getAllQuizAnswers() {
        try {
        const quizAnswers = await quizAnswerRepository.getAllQuizAnswers();
        return quizAnswers;
        } catch (error) {
        throw new Error('Error fetching quiz answers: ' + error.message);
        }
    }
    static async getQuizAnswerById(id) {
        try {
        if (!(await quizAnswerRepository.quiAnswerExists(id))) {
            throw new Error(`Quiz Answer ID: ${id} does not exist`);
        }
        const quizAnswer = await quizAnswerRepository.getQuizAnswerById(id);
        return quizAnswer;
        } catch (error) {
        throw new Error('Error fetching quiz answer: ' + error.message);
        }
    }
    static async createQuizAnswer(quizAnswer) {
        try {
          if (!(await quizQuestionRepository.quizQuestionExists(quizAnswer.questionId))) {
            throw new Error(`Quiz Question ID: ${quizAnswer.questionId} does not exist`);
            }  
        const newQuizAnswer = await quizAnswerRepository.createQuizAnswer(quizAnswer);
        return newQuizAnswer;
        } catch (error) {
        throw new Error('Error creating quiz answer: ' + error.message);
        }
    }
    static async updateQuizAnswer(quizAnswerData) {
        try {
        if (!(await quizAnswerRepository.quiAnswerExists(quizAnswerData.answerId))) {
            throw new Error(`Quiz Answer ID: ${quizAnswerData.answerId} does not exist`);
        }
        const updatedQuizAnswer = await quizAnswerRepository.updateQuizAnswer(quizAnswerData);
        return updatedQuizAnswer;
        } catch (error) {
        throw new Error('Error updating quiz answer: ' + error.message);
        }
    }
    static async deleteQuizAnswer(id) {
        try{
            if (!(await quizAnswerRepository.quiAnswerExists(id))) {
                throw new Error(`Quiz Answer ID: ${id} does not exist`);
            }
            await quizAnswerRepository.deleteQuizAnswer(id);
        }
        catch (error) {
            throw new Error('Error deleting quiz answer: ' + error.message);
        }
    }
}
module.exports = QuizAnswerService;