const db = require("../config/db");
const moment = require("moment");
const Instructor = require("../models/instructorModel");

/**
 * The `InstructorRepository` class provides a set of static 
 * methods to interact with the `instructors` table in the database.
 * It includes operations for creating, retrieving, updating, and deleting 
 * instructor records, as well as checking if an instructor exists.
 * 
 * @class
 */

class InstructorRepository {
  
      /**
     * createInstructor: Creates a new instructor in the database.
     * @param {Object} instructor - The instructor details.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */

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
      console.log(error);
      throw new Error("Error creating instructor: " + error.message);
    }
  }

      /**
     * getInstructorById: Retrieves an instructor by their ID.
     * @param {number} instructorId - The ID of the instructor.
     * @returns {Instructor} - An Instructor object.
     * @throws {Error} - Throws an error if there is a database issue.
     */
  
  static async getInstructorById(instructorId) {
    try {
      const query = "SELECT * FROM instructors WHERE instructor_id = ?";
      const rows = await db.query(query, [instructorId]);
      return Instructor.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching instructor: " + error.message);
    }
  }

     /**
     * getInstructorCourses: Retrieves all courses taught by an instructor.
     * @param {number} instructorId - The ID of the instructor.
     * @returns {Array} - An array of courses.
     * @throws {Error} - Throws an error if there is a database issue.
     */
  
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

      /**
     * updateInstructor: Updates the details of an existing instructor.
     * @param {Object} instructor - The updated instructor details.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */
  
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

      /**
     * deleteInstructor: Deletes an instructor from the database.
     * @param {number} instructorId - The ID of the instructor to delete.
     * @returns {number} - The number of affected rows.
     * @throws {Error} - Throws an error if there is a database issue.
     */
  
  static async deleteInstructor(instructorId) {
    try {
      const query = `DELETE FROM instructors WHERE instructor_id = ?`;
      const { affectedRows } = await db.query(query, [instructorId]);
      return affectedRows ;
    } catch (error) {
      throw new Error("Error deleting instructor: " + error.message);
    }
  }

     /**
     * getAllInstructors: Retrieves all instructors from the database.
     * @returns {Array} - An array of Instructor objects.
     * @throws {Error} - Throws an error if there is a database issue.
     */
  
  static async getAllInstructors() {
    try {
      const query = "SELECT * FROM instructors";
      const rows = await db.query(query);
      return rows.map(Instructor.fromRow);
    } catch (error) {
      throw new Error("Error fetching all instructors: " + error.message);
    }
  }

      /**
     * getInstructorByUserId: Retrieves an instructor by their user ID.
     * @param {number} userId - The user ID of the instructor.
     * @returns {Instructor} - An Instructor object.
     * @throws {Error} - Throws an error if there is a database issue.
     */
  
  static async getInstructorByUserId(userId) {
    try {
      const query = "SELECT * FROM instructors WHERE user_id = ?";
      const rows = await db.query(query, [userId]);
      return Instructor.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching instructor by user ID: " + error.message);
    }
  
  }

    /**
     * isInstructorExist: Checks if an instructor exists by their instructor ID.
     * @param {number} instructorId - The ID of the instructor.
     * @returns {boolean} - True if the instructor exists, false otherwise.
     * @throws {Error} - Throws an error if there is a database issue.
     */

  static async isInstructorExist(instructorId) {
    try {
      const query = "SELECT * FROM instructors WHERE instructor_id = ?";
      const rows = await db.query(query, [instructorId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error checking if instructor exists: " + error.message);
    }
  }

    /**
     * isInstructorExistByUserId: Checks if an instructor exists by their user ID.
     * @param {number} userId - The user ID of the instructor.
     * @returns {boolean} - True if the instructor exists, false otherwise.
     * @throws {Error} - Throws an error if there is a database issue.
     */

  static async isInstructorExistByUserId(userId) {
    try {
      const query = "SELECT * FROM instructors WHERE user_id = ?";
      const rows = await db.query(query, [userId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error checking if instructor exists: " + error.message);
    }
  }
 
}

module.exports = InstructorRepository;
