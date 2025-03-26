const db = require("../config/db");
const moment = require("moment");
const Student = require("../models/studentModel");

class StudentRepository {
  // Create a new student
  static async createStudent(student) {
    try {
      const query = `INSERT INTO students (user_id, stu_FName, stu_LName, dob, profile_picture) 
                           VALUES (?, ?, ?, ?, ?)`;
      const { affectedRows } = await db.query(query, [
        student.userId,
        student.stuFNname ,
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

  // Get student by ID
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

  // Get all students
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

  // Update student information
  static async updateStudent(student) {
    try {
     // console.log(student);
      const query = `UPDATE students SET user_id =?,stu_FName = ?, stu_LName = ?, dob = ?, profile_picture = ? 
                           WHERE studend_id = ?`;
      const { affectedRows } = await db.query(query, [
        student.userId,
        student.stuFNname,
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

  // Delete a student
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
}

module.exports = StudentRepository;
