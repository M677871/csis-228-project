const db = require("../config/db");
const moment = require("moment");
const Quiz = require("../models/quizModel");

class QuizRepository {

   /**
   * createQuiz: Adds a new quiz to the database.
   * @param {Object} quiz - The quiz details.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if there is a database issue.
   */


  static async createQuiz(quiz) {
    try {
      const query = `INSERT INTO quizzes (course_id, quiz_name, quiz_description, created_at) VALUES (?, ?, ?, ?)`;
      const { affectedRows } = await db.query(query, [
        quiz.courseId,
        quiz.quizName,
        quiz.quizDescription,
        quiz.createAt
      ]);

      return affectedRows;
    } catch (error) {
      throw new Error("Error creating quiz: " + error.message);
    }
  }

  /**
   * getQuizById: Retrieves a quiz by its ID.
   * @param {number} quizId - The ID of the quiz.
   * @returns {Quiz} - A Quiz object.
   * @throws {Error} - Throws an error if there is a database issue.
   */

  static async getQuizById(quizId) {
    try {
      const query = "SELECT * FROM quizzes WHERE quiz_id = ?";
      const rows = await db.query(query, [quizId]);
      return Quiz.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching quiz: " + error.message);
    }
  }

  /**
   * getAllQuizzes: Retrieves all quizzes from the database.
   * @returns {Quiz[]} - An array of Quiz objects.
   * @throws {Error} - Throws an error if there is a database issue.
   */

  static async getAllQuizzes() {
    try {
      const query = "SELECT * FROM quizzes";
      const rows = await db.query(query);
      return rows.map(Quiz.fromRow);
    } catch (error) {
      throw new Error("Error fetching all quizzes: " + error.message);
    }
  }

  /**
   * getQuizzesByCourseId: Retrieves quizzes by course ID.
   * @param {number} courseId - The ID of the course.
   * @returns {Quiz[]} - An array of Quiz objects.
   * @throws {Error} - Throws an error if there is a database issue.
   */

  static async getQuizzesByCourseId(courseId) {
    try {
      const query = "SELECT * FROM quizzes WHERE course_id = ?";
      const rows = await db.query(query, [courseId]);
      return rows.map(Quiz.fromRow);
    } catch (error) {
      throw new Error("Error fetching quizzes by course ID: " + error.message);
    }
  }

  /**
   * updateQuiz: Updates an existing quiz.
   * @param {Object} quiz - The quiz details.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if there is a database issue.
   */

  static async updateQuiz(quiz) {
    try {
      const query = `UPDATE quizzes SET course_id=?, quiz_name=?,quiz_description=?,created_at=? WHERE quiz_id = ?`;

      const { affectedRows } = await db.query(query, [
        quiz.courseId,
        quiz.quizName,
        quiz.quizDescription,
        quiz.createAt,
        quiz.quizId
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error updating quiz: " + error.message);
    }
  }

  /**
   * deleteQuiz: Deletes a quiz by its ID.
   * @param {number} quizId - The ID of the quiz to delete.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if there is a database issue.
   */

  static async deleteQuiz(quizId) {
    try {
      const query = `DELETE FROM quizzes WHERE quiz_id = ?`;
      const { affectedRows } = await db.query(query, [quizId]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error deleting quiz: " + error.message);
    }
  }

  /**
   * quizExists: Checks if a quiz exists by its ID.
   * @param {number} quizId - The ID of the quiz to check.
   * @returns {boolean} - True if the quiz exists, false otherwise.
   * @throws {Error} - Throws an error if there is a database issue.
   */

  static async quizExists(quizId) {
    try {
      const query = `SELECT * FROM quizzes WHERE quiz_id = ?`;
      const rows = await db.query(query, [quizId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error fetching quiz: " + error.message);
    }
  }
}
module.exports = QuizRepository;
