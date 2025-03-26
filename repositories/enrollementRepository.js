const db = require("../config/db");
const moment = require("moment");
const Enrollment = require("../models/enrollementModel");

class EnrollementRepository {
  static async createEnrollement(enrollement) {
    try {
      const query = `INSERT INTO enrollments (student_id,course_id, status,enrolled_at) VALUES (?, ?, ?,?)`;
      const { affectedRows } = await db.query(query, [
        enrollement.studentId,
        enrollement.courseId,
        enrollement.status,
        moment().format("YYYY-MM-DD HH:mm:ss")
      ]);

      return affectedRows;
    } catch (error) {
      throw new Error("Error creating enrollement: " + error.message);
    }
  }

  static async getEnrollementById(enrollementId) {
    try {
      const query = "SELECT * FROM enrollments WHERE enrollment_id = ?";
      const rows = await db.query(query, [enrollementId]);
      return Enrollment.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching enrollement: " + error.message);
    }
  }
  static async getAllEnrollements() {
    try {
      const query = "SELECT * FROM enrollments";
      const rows = await db.query(query);
      return rows.map(Enrollment.fromRow);
    } catch (error) {
      throw new Error("Error fetching all enrollements: " + error.message);
    }
  }

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

  static async updateEnrollement(enrollement) {
    try {
      const query = `update enrollments set course_id =?,status=?,enrolled_at=? where enrollment_id = ?`;

      const { affectedRows } = await db.query(query, [
        enrollement.courseId,
        enrollement.status,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        enrollement.enrollementId
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error updating enrollement: " + error.message);
    }
  }

  static async deleteEnrollement(enrollementId) {
    try {
      const query = `DELETE FROM enrollments WHERE enrollment_id = ?`;
      const { affectedRows } = await db.query(query, [enrollementId]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error deleting enrollement: " + error.message);
    }
  }
  static async isEnrollementExists(enrollementId) {
    try {
      const query = "SELECT * FROM enrollments WHERE enrollment_id = ?";
      const rows = await db.query(query, [enrollementId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error fetching enrollement: " + error.message);
    }
  }
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
