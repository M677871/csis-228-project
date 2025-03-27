const db = require("../config/db");
const moment = require("moment");
const Instructor = require("../models/instructorModel");

class InstructorRepository {
  // Create a new instructor
  static async createInstructor(instructor) {
    try {
      const query = `INSERT INTO instructors (user_id,ins_FName,ins_LName, bio, profile_picture) VALUES (?, ?, ?, ?, ?)`;
      const { affectedRows } = await db.query(query, [
        instructor.userId,
        instructor.insFName,
        instructor.insLName,
        instructor.bio,
        instructor.profilePicture
      ]);

      return affectedRows ;
    } catch (error) {
      throw new Error("Error creating instructor: " + error.message);
    }
  }

  // Get instructor by ID
  static async getInstructorById(instructorId) {
    try {
      const query = "SELECT * FROM instructors WHERE instructor_id = ?";
      const rows = await db.query(query, [instructorId]);
      return Instructor.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching instructor: " + error.message);
    }
  }

  // Get all courses an instructor teaches
  static async getInstructorCourses(instructorId) {
    try {
      const query = `SELECT * FROM courses 
                           WHERE instructor_id = ?`;
      const rows = await db.query(query, [instructorId]);
      return rows;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching instructor courses: " + error.message);
    }
  }

  // Update instructor information
  static async updateInstructor(instructor) {
    try {
      const query = `UPDATE instructors SET user_id=?, ins_FName=?,ins_LName=?,bio=?,profile_picture=? WHERE instructor_id = ?`;
     
      const { affectedRows } = await db.query(query, [
        instructor.userId,
       instructor.insFName,
       instructor.insLName,
         instructor.bio,
            instructor.profilePicture,
            instructor.instructorId

      ]);
      return affectedRows ;
    } catch (error) {
      throw new Error("Error updating instructor: " + error.message);
    }
  }

  // Delete an instructor
  static async deleteInstructor(instructorId) {
    try {
      const query = `DELETE FROM instructors WHERE instructor_id = ?`;
      const { affectedRows } = await db.query(query, [instructorId]);
      return affectedRows ;
    } catch (error) {
      throw new Error("Error deleting instructor: " + error.message);
    }
  }

  // Get all instructors
  static async getAllInstructors() {
    try {
      const query = "SELECT * FROM instructors";
      const rows = await db.query(query);
      return rows.map(Instructor.fromRow);
    } catch (error) {
      throw new Error("Error fetching all instructors: " + error.message);
    }
  }

  // Get instructor by userId
  static async getInstructorByUserId(userId) {
    try {
      const query = "SELECT * FROM instructors WHERE user_id = ?";
      const rows = await db.query(query, [userId]);
      return Instructor.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching instructor by user ID: " + error.message);
    }
  
  }

  static async isInstructorExist(instructorId) {
    try {
      const query = "SELECT * FROM instructors WHERE instructor_id = ?";
      const rows = await db.query(query, [instructorId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error checking if instructor exists: " + error.message);
    }
  }
 
}

module.exports = InstructorRepository;
