const db = require("../config/db");
const QuizQuestion = require("../models/quizQuestionModel");
const moment = require("moment");
class QuizQuestionRepository {
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

    static async getQuizQuestionById(questionId) {
        try {
            const query = "SELECT * FROM quiz_questions WHERE question_id = ?";
            const rows = await db.query(query, [questionId]);
            return QuizQuestion.fromRow(rows[0]);
        } catch (error) {
            throw new Error("Error fetching quiz question: " + error.message);
        }
    }

    static async getAllQuizQuestions() {
        try {
            const query = "SELECT * FROM quiz_questions";
            const rows = await db.query(query);
            return rows.map(QuizQuestion.fromRow);
        } catch (error) {
            throw new Error("Error fetching all quiz questions: " + error.message);
        }
    }

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
    static async deleteQuizQuestionByQuizId(quizId) {
        try {
            const query = `DELETE FROM quiz_questions WHERE quiz_id = ?`;
            const { affectedRows } = await db.query(query, [quizId]);
            return affectedRows;
        } catch (error) {
            throw new Error("Error deleting quiz question: " + error.message);
        }
    }
    static async deleteQuizQuestion(questionId) {
        try {
            const query = `DELETE FROM quiz_questions WHERE question_id = ?`;
            const { affectedRows}= await db.query(query, [questionId]);
            return affectedRows;
        } catch (error) {
            throw new Error("Error deleting quiz question: " + error.message);
        }
    }
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