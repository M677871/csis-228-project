const db = require("../config/db");
const moment = require("moment");
const Enrollment = require("../models/enrollementModel");

class EnrollementRepository {

  /**
   * createEnrollement: Creates a new enrollment record in the database.
   * @param {Object} enrollement - The enrollment details.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async createEnrollement(enrollement) {
    try {
      const query = `INSERT INTO enrollments (student_id,course_id, status,enrolled_at) VALUES (?, ?, ?,?)`;
      const { affectedRows } = await db.query(query, [
        enrollement.studentId,
        enrollement.courseId,
        enrollement.status,
        enrollement.enrolledAt
      ]);

      return affectedRows;
    } catch (error) {
      throw new Error("Error creating enrollement: " + error.message);
    }
  }

  /**
   * getEnrollementById: Retrieves an enrollment by its ID.
   * @param {number} enrollementId - The ID of the enrollment.
   * @returns {Enrollment} - An Enrollment object.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async getEnrollementById(enrollementId) {
    try {
      const query = "SELECT * FROM enrollments WHERE enrollment_id = ?";
      const rows = await db.query(query, [enrollementId]);
      return Enrollment.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching enrollement: " + error.message);
    }
  }

  /**
   * getAllEnrollements: Retrieves all enrollments from the database.
   * @returns {Array} - An array of Enrollment objects.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async getAllEnrollements() {
    try {
      const query = "SELECT * FROM enrollments";
      const rows = await db.query(query);
      return rows.map(Enrollment.fromRow);
    } catch (error) {
      throw new Error("Error fetching all enrollements: " + error.message);
    }
  }

  /**
   * getEnrollementsByStudentId: Retrieves all enrollments for a given student.
   * @param {number} studentId - The ID of the student.
   * @returns {Array} - An array of Enrollment objects.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async getEnrollementsByStudentId(studentId) {
    try {
      const query = "SELECT * FROM enrollments WHERE student_id = ?";
      const rows = await db.query(query, [studentId]);
      return rows.map(Enrollment.fromRow);
    } catch (error) {
      throw new Error(
        "Error fetching enrollements by user ID: " + error.message
      );
    }
  }

  /**
   * getEnrollementsByCourseId: Retrieves all enrollments for a given course.
   * @param {number} courseId - The ID of the course.
   * @returns {Array} - An array of Enrollment objects.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async getEnrollementsByCourseId(courseId) {
    try {
      const query = "SELECT * FROM enrollments WHERE course_id = ?";
      const rows = await db.query(query, [courseId]);
      return rows.map(Enrollment.fromRow);
    } catch (error) {
      throw new Error(
        "Error fetching enrollements by course ID: " + error.message
      );
    }
  }

  /**
   * updateEnrollement: Updates the details of an existing enrollment.
   * @param {Object} enrollement - The updated enrollment details.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async updateEnrollement(enrollement) {
    try {
      const query = `update enrollments set course_id =?,status=?,enrolled_at=? where enrollment_id = ?`;

      const { affectedRows } = await db.query(query, [
        enrollement.courseId,
        enrollement.status,
        enrollement.enrolledAt,
        enrollement.enrollementId
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error updating enrollement: " + error.message);
    }
  }

  /**
   * deleteEnrollement: Deletes an enrollment from the database.
   * @param {number} enrollementId - The ID of the enrollment to delete.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async deleteEnrollement(enrollementId) {
    try {
      const query = `DELETE FROM enrollments WHERE enrollment_id = ?`;
      const { affectedRows } = await db.query(query, [enrollementId]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error deleting enrollement: " + error.message);
    }
  }

  /**
   * isEnrollementExists: Checks if an enrollment exists by its ID.
   * @param {number} enrollementId - The ID of the enrollment.
   * @returns {boolean} - Returns true if the enrollment exists, false otherwise.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async isEnrollementExists(enrollementId) {
    try {
      const query = "SELECT * FROM enrollments WHERE enrollment_id = ?";
      const rows = await db.query(query, [enrollementId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error fetching enrollement: " + error.message);
    }
  }

  /**
   * getEnrollmentByStudentAndCourse: Checks if a student is enrolled in a specific course.
   * @param {number} studentId - The ID of the student.
   * @param {number} courseId - The ID of the course.
   * @returns {boolean} - Returns true if the student is enrolled in the course, false otherwise.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async getEnrollmentByStudentAndCourse (studentId, courseId) {
    try{
    const query = 'SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?';
    const result = await db.query(query, [studentId, courseId]);
    return result.length > 0 ? true : false;
  }catch(error){
    throw new Error('Error fetching enrollement: ' + error.message);
  }
}
}
module.exports = EnrollementRepository;
