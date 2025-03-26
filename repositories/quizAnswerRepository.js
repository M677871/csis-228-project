const db = require("../config/db");
const QuizAnswer =require("../models/quizAnswerModel");


class QuizAnswerRepository {
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

    static async getQuizAnswerById(answerId) {
        try {
            const query = "SELECT * FROM quiz_answers WHERE answer_id = ?";
            const rows = await db.query(query, [answerId]);
            return QuizAnswer.fromRow(rows[0]);
        } catch (error) {
            throw new Error("Error fetching quiz answer: " + error.message);
        }
    }

    static async getAllQuizAnswers() {
        try {
            const query = "SELECT * FROM quiz_answers";
            const rows = await db.query(query);
            return rows.map(QuizAnswer.fromRow);
        } catch (error) {
            throw new Error("Error fetching all quiz answers: " + error.message);
        }
    }


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
    static async deleteQuizAnswer(answerId) {
        try {
            const query = `DELETE FROM quiz_answers WHERE answer_id = ?`;
            const { affectedRows } = await db.query(query, [answerId]);
            return affectedRows;
        } catch (error) {
            throw new Error("Error deleting quiz answer: " + error.message);
        }
    }
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