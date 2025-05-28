const quizRepository = require('../repositories/quizRepository');
const courseRepository = require('../repositories/courseRepository');

/**
 * The `QuizService` class provides methods to manage quizzes, including fetching quiz details,
 * creating, updating, deleting quizzes, and retrieving quizzes by course ID.
 *
 * @class
 */
class QuizService {

    /**
     * Retrieves all quizzes.
     *
     * @returns {Quiz[]} - A promise that resolves to an array of quiz objects.
     * @throws {Error} - Throws an error if the course does not exist or the operation fails.
     */
    static async getAllQuizzes() {
        try {
            const quizzes = await quizRepository.getAllQuizzes();
            return quizzes;
        } catch (error) {
            throw new Error('Error fetching quizzes: ' + error.message);
        }
    }

    /**
     * Retrieves a quiz by its ID.
     *
     * @param {number} id - The ID of the quiz to retrieve.
     * @returns {Quiz} - A promise that resolves to the quiz object.
     * @throws {Error} - Throws an error if the quiz does not exist or the operation fails.
     */
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

    /**
     * Creates a new quiz.
     *
     * @param {Object} quiz - The quiz data.
     * @returns {Quiz} - A promise that resolves to the newly created quiz object.
     * @throws {Error} - Throws an error if the associated course does not exist or the operation fails.
     */
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

    /**
     * Updates an existing quiz.
     *
     * @param {Object} quizData - The updated quiz data.
     * @returns {Quiz} - A promise that resolves to the updated quiz object.
     * @throws {Error} - Throws an error if the quiz or course does not exist or the operation fails.
     */
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

    /**
     * Deletes a quiz by its ID.
     *
     * @param {number} id - The ID of the quiz to delete.
     * @returns {void} - A promise that resolves once the quiz is deleted.
     * @throws {Error} - Throws an error if the quiz does not exist or the operation fails.
     */
    static async deleteQuiz(id) {
        try {
            if (!(await quizRepository.quizExists(id))) {
                throw new Error(`Quiz ID: ${id} does not exist`);
            }
            return await quizRepository.deleteQuiz(id);
        } catch (error) {
            throw new Error('Error deleting quiz: ' + error.message);
        }
    }

    /**
     * @async
     * @description Retrieves quizzes relevant to a specific student.
     * This might include quizzes for enrolled courses, or quizzes the student has taken.
     * @param {number} studentId - The ID of the student.
     * @returns {Promise<Array>} A promise that resolves to an array of quiz objects.
     * @throws {Error} Throws an error if there's an issue fetching the quizzes.
     */
    static async getQuizzesByStudentId(studentId) { // <--- ADDED THIS METHOD
        try {
            // This method will likely need to join quizzes with enrollments or quiz_results
            // to find quizzes relevant to the student.
            const quizzes = await quizRepository.getQuizzesByStudentId(studentId);
            return quizzes;
        } catch (error) {
            throw new Error('Error fetching quizzes for student: ' + error.message);
        }
    }
}
module.exports = QuizService;
