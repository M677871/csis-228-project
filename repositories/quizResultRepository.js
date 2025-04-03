const db = require("../config/db");
const moment = require("moment");
const QuizResult = require("../models/quizResult");

/**
 * The `QuizResultRepository` class provides methods to interact with the `quiz_results` table in the database.
 * It supports operations like creating, retrieving, updating, deleting quiz results, and checking if a quiz result exists.
 * 
 * @class
 */

class QuizResultRepository {

  /**
   * createQuizResult: Adds a new quiz result to the database.
   * @param {Object} quizResult - An object containing the details of the quiz result.
   * 
   * @returns {number} - The number of affected rows (1 if successfully inserted).
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */

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
    
  /**
   * getQuizResultById: Fetches a quiz result by its unique result ID.
   * @param {number} resultId - The ID of the quiz result.
   * @returns {object} - A `QuizResult` object containing the result data.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */

    static async getQuizResultById(resultId) {
        try {
        const query = "SELECT * FROM quiz_results WHERE result_id = ?";
        const rows = await db.query(query, [resultId]);
        return QuizResult.fromRow(rows[0]);
        } catch (error) {
        throw new Error("Error fetching quiz result: " + error.message);
        }
    }
    
  /**
   * getAllQuizResults: Retrieves all quiz results from the database.
   * @returns {array} - An array of `QuizResult` objects.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */

    static async getAllQuizResults() {
        try {
        const query = "SELECT * FROM quiz_results";
        const rows = await db.query(query);
        return rows.map(QuizResult.fromRow);
        } catch (error) {
        throw new Error("Error fetching all quiz results: " + error.message);
        }
    }
    
     /**
   * getQuizResultsByStudentId: Retrieves quiz results for a specific student by their ID.
   * @param {number} studentId - The ID of the student.
   * @returns {array} - An array of `QuizResult` objects.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
    
    static async getQuizResultsByStudentId(studentId) {
        try {
        const query = "SELECT * FROM quiz_results WHERE student_id = ?";
        const rows = await db.query(query, [studentId]);
        return rows.map(QuizResult.fromRow);
        } catch (error) {
        throw new Error("Error fetching quiz results by student ID: " + error.message);
        }
    }

     /**
   * updateQuizResult: Updates an existing quiz result in the database.
   * @param {Object} quizResult - An object containing the updated details of the quiz result.
   * @returns {number} - The number of affected rows (1 if successfully updated).
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
    
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

  /**
   * deleteQuizResultByQuizId: Deletes all quiz results associated with a specific quiz ID.
   * @param {number} quizId - The ID of the quiz whose results should be deleted.
   * @returns {Promise<number>} - The number of affected rows (number of results deleted).
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */


    static async deleteQuizResultByQuizId(quizId) {
        try {
        const query = `DELETE FROM quiz_results WHERE quiz_id = ?`;
        const { affectedRows } = await db.query(query, [quizId]);
        return affectedRows;
        } catch (error) {
        throw new Error("Error deleting quiz result: " + error.message);
        }
    }

  /**
   * deleteQuizResult: Deletes a specific quiz result by its result ID.
   * @param {number} resultId - The ID of the quiz result to delete.
   * @returns {Promise<number>} - The number of affected rows (1 if successfully deleted).
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */

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

  /**
   * quizResultExists: Checks if a quiz result exists by its result ID.
   * @param {number} resultId - The ID of the quiz result to check.
   * @returns {boolean} - `true` if the result exists, `false` otherwise.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */

    static async quizResultExists(resultId) {
        try {
        const query = "SELECT * FROM quiz_results WHERE result_id = ?";
        const rows = await db.query(query, [resultId]);
        return rows.length > 0 ? true : false;
        } catch (error) {
        throw new Error("Error fetching quiz result: " + error.message);
        }
    }

  /**
   * quizResultExistByStudentIdandQuizId: Checks if a quiz result exists for a specific student and quiz combination.
   * @param {number} studentId - The ID of the student.
   * @param {number} quizId - The ID of the quiz.
   * @returns {boolean} - `true` if the result exists, `false` otherwise.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */

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