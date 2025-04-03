const db = require("../config/db");
const QuizAnswer =require("../models/quizAnswerModel");


class QuizAnswerRepository {

    /**
     * createQuizAnswer: Adds a new quiz answer to the database.
     * @param {Object} quizAnswer - The quiz answer details.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async createQuizAnswer(quizAnswer) {
        try {
            const query = `INSERT INTO quiz_answers (answer_id, question_id, answer_text, answer_type,is_correct) VALUES (?, ?, ?, ?,?)`;
            const { affectedRows } = await db.query(query, [
                quizAnswer.answerId,
                quizAnswer.questionId,
                quizAnswer.answerText,
                quizAnswer.answerType,
                quizAnswer.isCorrect
            ]);

            return affectedRows;
        } catch (error) {
            throw new Error("Error creating quiz answer: " + error.message);
        }
    }

    /**
     * getQuizAnswerById: Retrieves a quiz answer by its ID.
     * @param {number} answerId - The ID of the quiz answer.
     * @returns {QuizAnswer} - A QuizAnswer object.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async getQuizAnswerById(answerId) {
        try {
            const query = "SELECT * FROM quiz_answers WHERE answer_id = ?";
            const rows = await db.query(query, [answerId]);
            return QuizAnswer.fromRow(rows[0]);
        } catch (error) {
            throw new Error("Error fetching quiz answer: " + error.message);
        }
    }

    /**
     * getAllQuizAnswers: Retrieves all quiz answers from the database.
     * @returns {QuizAnswer[]} - An array of QuizAnswer objects.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async getAllQuizAnswers() {
        try {
            const query = "SELECT * FROM quiz_answers";
            const rows = await db.query(query);
            return rows.map(QuizAnswer.fromRow);
        } catch (error) {
            throw new Error("Error fetching all quiz answers: " + error.message);
        }
    }

    /**
     * updateQuizAnswer: Updates an existing quiz answer.
     * @param {Object} quizAnswer - The quiz answer details.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async updateQuizAnswer(quizAnswer) {
        try {
            const query = `UPDATE quiz_answers SET question_id=?, answer_text=?, answer_type=?,is_correct=? WHERE answer_id = ?`;

            const { affectedRows } = await db.query(query, [
               quizAnswer.questionId,
               quizAnswer.answerText,
               quizAnswer.answerType,
               quizAnswer.isCorrect,
               quizAnswer.answerId
            ]);
            return affectedRows;
        }
        catch (error) {
            throw new Error("Error updating quiz answer: " + error.message);
        }
    }

     /**
     * deleteQuizAnswer: Deletes a quiz answer by its ID.
     * @param {number} answerId - The ID of the quiz answer to delete.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async deleteQuizAnswer(answerId) {
        try {
            const query = `DELETE FROM quiz_answers WHERE answer_id = ?`;
            const { affectedRows } = await db.query(query, [answerId]);
            return affectedRows;
        } catch (error) {
            throw new Error("Error deleting quiz answer: " + error.message);
        }
    }

    /**
     * quizAnswerExists: Checks if a quiz answer exists by its ID.
     * 
     * @param {number} answerId - The ID of the quiz answer to check.
     * @returns {boolean} - True if the quiz answer exists, false otherwise.
     * @throws {Error} - Throws an error if there is a database issue.
     */

    static async quiAnswerExists(answerId) {
        try {
            const query = "SELECT * FROM quiz_answers WHERE answer_id = ?";
            const rows = await db.query(query, [answerId]);
            return rows.length > 0 ? true : false;
        } catch (error) {
            throw new Error("Error fetching quiz answer: " + error.message);
}
    }
}
module.exports = QuizAnswerRepository;