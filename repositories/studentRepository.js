const db = require("../config/db");
const moment = require("moment");
const Student = require("../models/studentModel");

/**
 * The `StudentRepository` class provides methods to interact with the `students` table in the database.
 * It supports operations like creating, retrieving, updating, deleting student records, checking if a student exists,
 * and fetching the courses a student is enrolled in.
 * 
 * @class
 */

class StudentRepository {
  
    /**
   * Create a new student.
   * @param {Object} student - The student data.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - If the operation fails.
   */

  static async createStudent(student) {
    try {
      const query = `INSERT INTO students (user_id, stu_FName, stu_LName, dob, profile_picture) 
                           VALUES (?, ?, ?, ?, ?)`;
      const { affectedRows } = await db.query(query, [
        student.userId,
        student.stuFName ,
        student.stuLName,
        moment(student.dob).format("YYYY-MM-DD"),
        student.profilePicture
      ]);
     
      return affectedRows;
    } catch (error) {
      console.error("Error in createStudent:", error);
      throw new Error("Error creating student: " + error.message);
    }
  }

  /**
   * Get a student by their student ID.
   * @param {number} studentId - The ID of the student.
   * @returns {Object|null} - The student object or null if not found.
   * @throws {Error} - If the operation fails.
   */
  
  static async getStudentById(studentId) {
    try {
      const query = "SELECT * FROM students WHERE studend_id = ?";
      const rows = await db.query(query, [studentId]);
      return rows.length === 0 ? null : Student.fromRow(rows[0]);
    } catch (error) {
      console.error("Error in getStudentById:", error);
      throw new Error("Error fetching student: " + error.message);
    }
  }

   /**
   * Get all students.
   * @returns {Array} - An array of all student objects.
   * @throws {Error} - If the operation fails.
   */
  
  static async getAllStudents() {
    try {
      const query = "SELECT * FROM students";
      const rows = await db.query(query);
      return rows.map(Student.fromRow);
    } catch (error) {
      console.error("Error in getAllStudents:", error);
      throw new Error("Error fetching all students: " + error.message);
    }
  }

   /**
   * Update a student's information.
   * @param {Object} student - The student data to update.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - If the operation fails.
   */
  
  static async updateStudent(student) {
    try {
     // console.log(student);
      const query = `UPDATE students SET user_id =?,stu_FName = ?, stu_LName = ?, dob = ?, profile_picture = ? 
                           WHERE studend_id = ?`;
      const { affectedRows } = await db.query(query, [
        student.userId,
        student.stuFName,
        student.stuLName,
        student.dob,
        student.profilePicture,
        student.studentId
      ]);
      
      return affectedRows;
    } catch (error) {
      console.error("Error in updateStudent:", error);
      throw new Error("Error updating student: " + error.message);
    }
  }

   /**
   * Delete a student by their student ID.
   * @param {number} studentId - The ID of the student to delete.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - If the operation fails.
   */
  
  static async deleteStudent(studentId) {
    try {
      const query = "DELETE FROM students WHERE studend_id = ?";
      const { affectedRows } = await db.query(query, [studentId]);
      return affectedRows;
    } catch (error) {
      console.error("Error in deleteStudent:", error);
      throw new Error("Error deleting student: " + error.message);
    }
  }

    /**
   * Check if a student exists by student ID.
   * @param {number} studentId - The student ID to check.
   * @returns {boolean} - Returns true if the student exists, false otherwise.
   * @throws {Error} - If the operation fails.
   */

  static async studentExists(studentId) {
    try {
      const query = "SELECT * FROM students WHERE studend_id =?"; 

      const rows = await db.query(query, [studentId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
     // console.error("Error in studentExists:", error);
      throw new Error("Error checking if student exists: " + error.message);
    }
  }

  /**
   * Get courses a student is enrolled in.
   * @param {number} studentId - The ID of the student.
   * @returns {Array} - A list of courses the student is enrolled in.
   * @throws {Error} - If the operation fails.
   */

  static async getStudentCourses(studentId) {
    try {
      const query = `SELECT * FROM courses WHERE course_id IN
                           (SELECT course_id FROM enrollments WHERE student_id = ?)`;
       const result = await db.query(query, [studentId]);
      return result;                    
    } catch (error) {
      console.error("Error in getStudentCourses:", error);
      throw new Error("Error fetching student courses: " + error.message);
    }
  }

  /**
   * Get a student by their user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Object|null} - The student object or null if not found.
   * @throws {Error} - If the operation fails.
   */

  static async getStudentByUserId(userId) {
    try {
      const query = "SELECT * FROM students WHERE user_id = ?";
      const rows = await db.query(query, [userId]);
      return rows.length === 0 ? null : Student.fromRow(rows[0]);
    } catch (error) {
      console.error("Error in getStudentByUserId:", error);
      throw new Error("Error fetching student by user ID: " + error.message);
    }
  }

  /**
   * Check if a student exists by their user ID.
   * @param {number} userId - The user ID to check.
   * @returns {boolean} - Returns true if the student exists, false otherwise.
   * @throws {Error} - If the operation fails.
   */

  static async isStudentExistByUserId(userId) {
    try {
      const query = "SELECT * FROM students WHERE user_id = ?";
      const rows = await db.query(query, [userId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      console.error("Error in isStudentExistByUserId:", error);
      throw new Error("Error checking if student exists by user ID: " + error.message);
    }
  }
}

module.exports = StudentRepository;
