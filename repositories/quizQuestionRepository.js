const db = require("../config/db");
const QuizQuestion = require("../models/quizQuestionModel");
const moment = require("moment");

/**
 * The `QuizQuestionRepository` class provides a set of static methods
 *  to interact with the `quiz_questions` table in the database.
 * It includes operations for creating, retrieving, updating, 
 * deleting quiz questions, and checking if a quiz question exists.
 * 
 * @class
 */

class QuizQuestionRepository {

    /**
     * createQuizQuestion: Adds a new quiz question to the database.
     * @param {Object} quizQuestion - The quiz question details.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async createQuizQuestion(quizQuestion) {

        try {
            
            const query = `INSERT INTO quiz_questions ( quiz_id, question_text, created_at) VALUES (?, ?, ?)`;
            const { affectedRows } = await db.query(query, [
                quizQuestion.quizId,
                quizQuestion.questionText,
                quizQuestion.createdAt
            ]);

            return affectedRows;
        } catch (error) {
            throw new Error("Error creating quiz question: " + error.message);
        }
    }

   /**
     * getQuizQuestionById: Retrieves a quiz question by its ID.
     * @param {number} questionId - The ID of the quiz question.
     * @returns {QuizQuestion} - A QuizQuestion object.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async getQuizQuestionById(questionId) {
        try {
            const query = "SELECT * FROM quiz_questions WHERE question_id = ?";
            const rows = await db.query(query, [questionId]);
            return QuizQuestion.fromRow(rows[0]);
        } catch (error) {
            throw new Error("Error fetching quiz question: " + error.message);
        }
    }

    /**
     * getAllQuizQuestions: Retrieves all quiz questions from the database.
     * @returns {QuizQuestion[]} - An array of QuizQuestion objects.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async getAllQuizQuestions() {
        try {
            const query = "SELECT * FROM quiz_questions";
            const rows = await db.query(query);
            return rows.map(QuizQuestion.fromRow);
        } catch (error) {
            throw new Error("Error fetching all quiz questions: " + error.message);
        }
    }

    /**
     * updateQuizQuestion: Updates an existing quiz question.
     * @param {Object} quizQuestion - The quiz question details.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async updateQuizQuestion(quizQuestion) {
        try {
            const query = `UPDATE quiz_questions SET quiz_id=?,question_text=?,created_at=? WHERE question_id = ?`;

            const { affectedRows } = await db.query(query, [
                quizQuestion.quizId,
                quizQuestion.questionText,
                quizQuestion.createdAt,
                quizQuestion.questionId
            ]);
            return affectedRows;
        }
        catch (error) {
            throw new Error("Error updating quiz question: " + error.message);
        }
    }

    /**
     * deleteQuizQuestionByQuizId: Deletes all quiz questions associated with a quiz.
     * @param {number} quizId - The ID of the quiz.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async deleteQuizQuestionByQuizId(quizId) {
        try {
            const query = `DELETE FROM quiz_questions WHERE quiz_id = ?`;
            const { affectedRows } = await db.query(query, [quizId]);
            return affectedRows;
        } catch (error) {
            throw new Error("Error deleting quiz question: " + error.message);
        }
    }

    /**
     * deleteQuizQuestion: Deletes a specific quiz question by its ID.
     * @param {number} questionId - The ID of the quiz question to delete.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async deleteQuizQuestion(questionId) {
        try {
            const query = `DELETE FROM quiz_questions WHERE question_id = ?`;
            const { affectedRows}= await db.query(query, [questionId]);
            return affectedRows;
        } catch (error) {
            throw new Error("Error deleting quiz question: " + error.message);
        }
    }

    /**
     * quizQuestionExists: Checks if a quiz question exists by its ID.
     * @param {number} questionId - The ID of the quiz question to check.
     * @returns {boolean} - True if the quiz question exists, false otherwise.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async quizQuestionExists(questionId) {
        try {
            const query = "SELECT * FROM quiz_questions WHERE question_id = ?";
            const rows = await db.query(query, [questionId]);
            return rows.length > 0 ? true : false;
        } catch (error) {
            throw new Error("Error fetching quiz question: " + error.message);
        }
    }
}
module.exports = QuizQuestionRepository;