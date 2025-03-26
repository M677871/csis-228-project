const quizRepository = require('../repositories/quizRepository');
const courseRepository = require('../repositories/courseRepository');

class QuizService {
    static async getAllQuizzes() {
        try {
        const quizzes = await quizRepository.getAllQuizzes();
        return quizzes;
        } catch (error) {
        throw new Error('Error fetching quizzes: ' + error.message);
        }
    }
    static async getQuizById(id) {
        try {
            
        if (!(await quizRepository.quizExists(id))) {
            throw new Error(`Quiz ID: ${id} does not exist`);
        }
        const quiz = await quizRepository.getQuizById(id);
        return quiz;
        } catch (error) {
        throw new Error('Error fetching quiz: ' + error.message);
        }
    }
    static async createQuiz(quiz) {
        try {
       if (!(await courseRepository.courseExistsById(quiz.courseId))) {
                throw new Error(`Course ID: ${quiz.courseId} does not exist`);
            }
        const newQuiz = await quizRepository.createQuiz(quiz);
        return newQuiz;
        } catch (error) {
        throw new Error('Error creating quiz: ' + error.message);
        }
    }
    static async updateQuiz(quizData) {
        try {
            
        if (!(await quizRepository.quizExists(quizData.quizId))) {
            throw new Error(`Quiz ID: ${quizData.quizId} does not exist`);
        }
        if (!(await courseRepository.courseExistsById(quizData.courseId))) {
            throw new Error(`Course ID: ${quizData.courseId} does not exist`);
        }
        const updatedQuiz = await quizRepository.updateQuiz(quizData);
        return updatedQuiz;
        } catch (error) {
        throw new Error('Error updating quiz: ' + error.message);
        }
    }
    static async deleteQuiz(id) {
        try{
            
            if (!(await quizRepository.quizExists(id))) {
                throw new Error(`Quiz ID: ${id} does not exist`);
            }
          return  await quizRepository.deleteQuiz(id);
           
        }
        catch (error) {
            throw new Error('Error deleting quiz: ' + error.message);
        }
    }
}
module.exports = QuizService;