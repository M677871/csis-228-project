const quizAnswerRepository = require('../repositories/quizAnswerRepository');
const quizQuestionRepository = require('../repositories/quizQuestionRepository');

/**
 * The `QuizAnswerService` class manages operations related to quiz answers.
 * It provides methods to create, update, delete, and retrieve quiz answers.
 * The class ensures that quiz answers are linked to valid quiz questions.
 * 
 * @class
 */


class QuizAnswerService {

  /**
   * Retrieves all quiz answers.
   * 
   * @returns {Array} - A promise that resolves to an array of quiz answers.
   * @throws {Error} - Throws an error if fetching quiz answers fails.
   */

    static async getAllQuizAnswers() {
        try {
        const quizAnswers = await quizAnswerRepository.getAllQuizAnswers();
        return quizAnswers;
        } catch (error) {
        throw new Error('Error fetching quiz answers: ' + error.message);
        }
    }

  /**
   * Retrieves a specific quiz answer by its ID.
   * 
   * @param {number} id - The ID of the quiz answer to retrieve.
   * @returns {Object} - A promise that resolves to the quiz answer object.
   * @throws {Error} - Throws an error if the quiz answer does not exist or fetching fails.
   */

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

  /**
   * Creates a new quiz answer.
   * 
   * @param {Object} quizAnswer - The quiz answer data.
   * @returns {Object} - A promise that resolves to the newly created quiz answer object.
   * @throws {Error} - Throws an error if the quiz question does not exist or creating the quiz answer fails.
   */

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

  /**
   * Updates an existing quiz answer.
   * 
   * @param {Object} quizAnswerData - The updated quiz answer data..
   * @returns {Object} - A promise that resolves to the updated quiz answer object.
   * @throws {Error} - Throws an error if the quiz answer does not exist or updating the quiz answer fails.
   */

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

  /**
   * Deletes a quiz answer by its ID.
   * 
   * @param {number} id - The ID of the quiz answer to delete.
   * @returns {void} - A promise that resolves once the quiz answer is deleted.
   * @throws {Error} - Throws an error if the quiz answer does not exist or deleting fails.
   */

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