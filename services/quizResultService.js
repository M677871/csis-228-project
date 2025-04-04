const quizResultRepository = require('../repositories/quizResultRepository');
const quizRepository = require('../repositories/quizRepository');
const studentRepository = require('../repositories/studentRepository');

/**
 * The `QuizResultService` class provides methods to create, update, delete, and retrieve quiz results.
 * It ensures that quiz results are associated with valid quizzes and students 
 * and handles error cases like non-existent quiz results, quizzes, or students.
 * 
 * @class
 */

class QuizResultService {

  /**
   * Retrieves all quiz results.
   * 
   * @returns {Array} - A promise that resolves to an array of quiz results.
   * @throws {Error} - Throws an error if fetching quiz results fails.
   */

    static async getAllQuizResults() {
        try {
        const quizResults = await quizResultRepository.getAllQuizResults();
        return quizResults;
        } catch (error) {
        throw new Error('Error fetching quiz results: ' + error.message);
        }
    }

  /**
   * Retrieves a quiz result by its ID.
   * 
   * @param {number} id - The ID of the quiz result to retrieve.
   * @returns {Object} - A promise that resolves to the quiz result object.
   * @throws {Error} - Throws an error if the quiz result does not exist or fetching fails.
   */

    static async getQuizResultById(id) {
        try {
        if (!(await quizResultRepository.quizResultExists(id))) {
            throw new Error(`Quiz Result ID: ${id} does not exist`);
        }
        const quizResult = await quizResultRepository.getQuizResultById(id);
        return quizResult;
        } catch (error) {
        throw new Error('Error fetching quiz result: ' + error.message);
        }
    }

  /**
   * Creates a new quiz result.
   * 
   * @param {Object} quizResult - The quiz result data.
   * @returns {Object} - A promise that resolves to the newly created quiz result object.
   * @throws {Error} - Throws an error if the quiz or student does not exist, or the quiz result already exists for the student and quiz combination.
   */

    static async createQuizResult(quizResult) {
        try {
        if(await quizResultRepository.quizResultExistByStudentIdandQuizId(quizResult.studentId,quizResult.quizId)){
        throw new Error(`Quiz Result already exists for student ID: ${quizResult.studentId} and quiz ID: ${quizResult.quizId}`);
            }
if (!(await quizRepository.quizExists(quizResult.quizId))) {
            throw new Error(`Quiz ID: ${quizResult.quizId} does not exist`);
        }
        if (!(await studentRepository.studentExists(quizResult.studentId))) {
            throw new Error(`Student ID: ${quizResult.studentId} does not exist`);
        }

        const newQuizResult = await quizResultRepository.createQuizResult(quizResult);
        return newQuizResult;
        } catch (error) {
        throw new Error('Error creating quiz result: ' + error.message);
        }
    }

  /**
   * Updates an existing quiz result.
   * 
   * @param {Object} quizResultData - The updated quiz result data.
   * @returns {Object} - A promise that resolves to the updated quiz result object.
   * @throws {Error} - Throws an error if the quiz result, quiz, or student does not exist.
   */

    static async updateQuizResult(quizResultData) {
        try {
        if (!(await quizResultRepository.quizResultExists(quizResultData.resultId))) {
            throw new Error(`Quiz Result ID: ${quizResultData.resultId} does not exist`);
        }
        if (!(await quizRepository.quizExists(quizResultData.quizId))) {
            throw new Error(`Quiz ID: ${quizResultData.quizId} does not exist`);
        }
        if (!(await studentRepository.studentExists(quizResultData.studentId))) {
            throw new Error(`Student ID: ${quizResultData.studentId} does not exist`);
        }
        const updatedQuizResult = await quizResultRepository.updateQuizResult(quizResultData);
        return updatedQuizResult;
        } catch (error) {
        throw new Error('Error updating quiz result: ' + error.message);
        }
    }

  /**
   * Deletes a quiz result by its ID.
   * 
   * @param {number} id - The ID of the quiz result to delete.
   * @returns {void} - A promise that resolves once the quiz result is deleted.
   * @throws {Error} - Throws an error if the quiz result does not exist.
   */

    static async deleteQuizResult(id) {
        try{
            if (!(await quizResultRepository.quizResultExists(id))) {
                throw new Error(`Quiz Result ID: ${id} does not exist`);
            }
            await quizResultRepository.deleteQuizResult(id);
        }
        catch (error) {
            throw new Error('Error deleting quiz result: ' + error.message);
        }
    }
}
module.exports = QuizResultService;