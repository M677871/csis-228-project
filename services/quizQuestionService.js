const quizQuestionRepository = require('../repositories/quizQuestionRepository');
const quizRepository = require('../repositories/quizRepository');   

class QuizQuestionService {
    static async getAllQuizQuestions() {
        try {
        const quizQuestions = await quizQuestionRepository.getAllQuizQuestions();
        return quizQuestions;
        } catch (error) {
        throw new Error('Error fetching quiz questions: ' + error.message);
        }
    }
    static async getQuizQuestionById(id) {
        try {
        if (!(await quizQuestionRepository.quizQuestionExists(id))) {
            throw new Error(`Quiz Question ID: ${id} does not exist`);
        }
        const quizQuestion = await quizQuestionRepository.getQuizQuestionById(id);
        return quizQuestion;
        } catch (error) {
        throw new Error('Error fetching quiz question: ' + error.message);
        }
    }
    static async createQuizQuestion(quizQuestion) {
        try {
            if (!(await quizRepository.quizExists(quizQuestion.quizId))) {
                throw new Error(`Quiz ID: ${quizQuestion.quizId} does not exist`);  
            }
        const newQuizQuestion = await quizQuestionRepository.createQuizQuestion(quizQuestion);
        return newQuizQuestion;
        } catch (error) {
        throw new Error('Error creating quiz question: ' + error.message);
        }
    }
    static async updateQuizQuestion(quizQuestionData) {
        try {
            
        if (!(await quizQuestionRepository.quizQuestionExists(quizQuestionData.questionId))) {
            throw new Error(`Quiz Question ID: ${quizQuestionData.questionId} does not exist`);
        }
        const updatedQuizQuestion = await quizQuestionRepository.updateQuizQuestion(quizQuestionData);
        return updatedQuizQuestion;
        } catch (error) {
        throw new Error('Error updating quiz question: ' + error.message);
        }
    }
    static async deleteQuizQuestion(id) {
        try{
            if (!(await quizQuestionRepository.quizQuestionExists(id))) {
                throw new Error(`Quiz Question ID: ${id} does not exist`);
            }
            await quizQuestionRepository.deleteQuizQuestion(id);
        }
        catch (error) {
            throw new Error('Error deleting quiz question: ' + error.message);
        }
    }
}
module.exports = QuizQuestionService;