const db = require("../config/db");
const moment = require("moment");
const QuizResult = require("../models/quizResult");


class QuizResultRepository {
    static async createQuizResult(quizResult) {
        try {
        const query = `INSERT INTO quiz_results (quiz_id, student_id, score, completed_at) VALUES (?, ?, ?, ?)`;
        const { affectedRows } = await db.query(query, [
            quizResult.quizId,
            quizResult.studentId,
            quizResult.score,
            quizResult.completedAt
        ]);
    
        return affectedRows;
        } catch (error) {
        throw new Error("Error creating quiz result: " + error.message);
        }
    }
    
    static async getQuizResultById(resultId) {
        try {
        const query = "SELECT * FROM quiz_results WHERE result_id = ?";
        const rows = await db.query(query, [resultId]);
        return QuizResult.fromRow(rows[0]);
        } catch (error) {
        throw new Error("Error fetching quiz result: " + error.message);
        }
    }
    
    static async getAllQuizResults() {
        try {
        const query = "SELECT * FROM quiz_results";
        const rows = await db.query(query);
        return rows.map(QuizResult.fromRow);
        } catch (error) {
        throw new Error("Error fetching all quiz results: " + error.message);
        }
    }
    
   
    
    static async getQuizResultsByStudentId(studentId) {
        try {
        const query = "SELECT * FROM quiz_results WHERE student_id = ?";
        const rows = await db.query(query, [studentId]);
        return rows.map(QuizResult.fromRow);
        } catch (error) {
        throw new Error("Error fetching quiz results by student ID: " + error.message);
        }
    }
    
    static async updateQuizResult(quizResult) {
        try {
        const query = `UPDATE quiz_results SET quiz_id=?,student_id=?,score=?,completed_at=? WHERE result_id = ?`;
    
        const { affectedRows } = await db.query(query, [
            quizResult.quizId,
            quizResult.studentId,
            quizResult.score,
            quizResult.completedAt,
            quizResult.resultId
        ]);
        return affectedRows;
        }
        catch (error) {
        throw new Error("Error updating quiz result: " + error.message);
        }
    }
    static async deleteQuizResultByQuizId(quizId) {
        try {
        const query = `DELETE FROM quiz_results WHERE quiz_id = ?`;
        const { affectedRows } = await db.query(query, [quizId]);
        return affectedRows;
        } catch (error) {
        throw new Error("Error deleting quiz result: " + error.message);
        }
    }
    static async deleteQuizResult(resultId) {
        try {
        const query = `DELETE FROM quiz_results WHERE result_id = ?`;
        const { affectedRows } = await db.query(query, [resultId]);
        return affectedRows;
        }
        catch (error) {
        throw new Error("Error deleting quiz result: " + error.message);
        }
    }
    static async quizResultExists(resultId) {
        try {
        const query = "SELECT * FROM quiz_results WHERE result_id = ?";
        const rows = await db.query(query, [resultId]);
        return rows.length > 0 ? true : false;
        } catch (error) {
        throw new Error("Error fetching quiz result: " + error.message);
        }
    }
    static async quizResultExistByStudentIdandQuizId(studentId, quizId) {
        try{
            const query = "SELECT * FROM quiz_results WHERE student_id = ? AND quiz_id = ?";
            const rows = await db.query(query, [studentId, quizId]);
            return rows.length > 0 ? true : false;
        }catch (error) {
            throw new Error("Error fetching quiz result: " + error.message);
        }
}
}
module.exports = QuizResultRepository;