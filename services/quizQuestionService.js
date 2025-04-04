const quizQuestionRepository = require('../repositories/quizQuestionRepository');
const quizRepository = require('../repositories/quizRepository');   

/**
 * The `QuizQuestionService` class handles operations related to quiz questions.
 * It provides methods to create, update, delete, and retrieve quiz questions.
 * The class ensures that quiz questions are associated with valid quizzes and handles errors when quiz questions do not exist.
 * 
 * @class
 */

class QuizQuestionService {

  /**
   * Retrieves all quiz questions.
   * 
   * @returns {Array} - A promise that resolves to an array of quiz questions.
   * @throws {Error} - Throws an error if fetching quiz questions fails.
   */

    static async getAllQuizQuestions() {
        try {
        const quizQuestions = await quizQuestionRepository.getAllQuizQuestions();
        return quizQuestions;
        } catch (error) {
        throw new Error('Error fetching quiz questions: ' + error.message);
        }
    }

  /**
   * Retrieves a specific quiz question by its ID.
   * 
   * @param {number} id - The ID of the quiz question to retrieve.
   * @returns {Object} - A promise that resolves to the quiz question object.
   * @throws {Error} - Throws an error if the quiz question does not exist or fetching fails.
   */

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

  /**
   * Creates a new quiz question.
   * 
   * @param {Object} quizQuestion - The quiz question data.
   * @returns {Object} - A promise that resolves to the newly created quiz question object.
   * @throws {Error} - Throws an error if the quiz does not exist or creating the quiz question fails.
   */

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

 /**
   * Updates an existing quiz question.
   * 
   * @param {Object} quizQuestionData - The updated quiz question data.
   * @returns {Object} - A promise that resolves to the updated quiz question object.
   * @throws {Error} - Throws an error if the quiz question does not exist or updating the quiz question fails.
   */

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

  /**
   * Deletes a quiz question by its ID.
   * 
   * @param {number} id - The ID of the quiz question to delete.
   * @returns {void} - A promise that resolves once the quiz question is deleted.
   * @throws {Error} - Throws an error if the quiz question does not exist or deleting fails.
   */

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