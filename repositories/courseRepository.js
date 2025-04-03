const db = require("../config/db");
const Course = require("../models/courseModel");
const Instructor = require("../models/instructorModel");
const Student = require('../models/studentModel');
const moment = require("moment");
class CourseRepository {
  /**
   * Create a new course.
   * 
   * @param {Object} course - The course object containing course details.
   * @param {number} course.instructorId - The ID of the instructor for the course.
   * @param {number} course.categorieId - The category ID of the course.
   * @param {string} course.courseName - The name of the course.
   * @param {string} course.description - The description of the course.
   * @param {string} course.createAt - The creation date of the course.
   * @returns {number} - The number of affected rows, indicating the success of the operation.
   * @throws {Error} - Throws an error if the course creation fails.
   */
  static async createCourse(course) {
    try {
      const query = `INSERT INTO courses (instructor_id , categorie_id, course_name, description, create_at) VALUES (?, ?, ?, ?, ?)`;
      const { affectedRows } = await db.query(query, [
        course.instructorId,
        course.categorieId,
        course.courseName,
        course.description,
        course.createAt
      ]);

      return affectedRows;
    } catch (error) {
      throw new Error("Error creating course: " + error.message);
    }
  }

  /**
   * Get course details by ID.
   * 
   * @param {number} courseId - The ID of the course to fetch.
   * @returns {Course} - The course object populated with the course details.
   * @throws {Error} - Throws an error if fetching the course fails.
   */
  static async getCourseById(courseId) {
    try {
      const query = "SELECT * FROM courses WHERE course_id = ?";
      const rows = await db.query(query, [courseId]);
      return Course.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching course: " + error.message);
    }
  }

  /**
   * Get all courses.
   * 
   * @returns {Course[]} - An array of all course objects.
   * @throws {Error} - Throws an error if fetching the courses fails.
   */
  static async getAllCourses() {
    try {
      const query = "SELECT * FROM courses";
      const rows = await db.query(query);
      return rows.map(Course.fromRow);
    } catch (error) {
      throw new Error("Error fetching all courses: " + error.message);
    }
  }

    /**
   * Update the information of a course.
   * 
   * @param {Object} course - The course object containing the updated course details.
   * @param {number} course.instructorId - The ID of the instructor for the course.
   * @param {number} course.categorieId - The category ID of the course.
   * @param {string} course.courseName - The name of the course.
   * @param {string} course.description - The description of the course.
   * @param {string} course.createAt - The creation date of the course.
   * @param {number} course.courseId - The ID of the course to update.
   * @returns {number} - The number of affected rows, indicating the success of the operation.
   * @throws {Error} - Throws an error if updating the course fails.
   */
  static async updateCourse(course) {
    try {
      const query = `UPDATE courses SET instructor_id=?, categorie_id=?, course_name=?, description=?,create_at=? WHERE course_id = ?`;
      const { affectedRows } = await db.query(query, [
        course.instructorId,
        course.categorieId,
        course.courseName,
        course.description,
        course.createAt,
        course.courseId
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error updating course: " + error.message);
    }
  }

 /**
   * Delete a course by ID.
   * 
   * @param {number} courseId - The ID of the course to delete.
   * @returns {boolean} - Returns true if the course was deleted, false otherwise.
   * @throws {Error} - Throws an error if deleting the course fails.
   */
  static async deleteCourse(courseId) {
    try {
      const query = "DELETE FROM courses WHERE course_id = ?";
      const { affectedRows } = await db.query(query, [courseId]);
      return affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting course: " + error.message);
    }
  }


   /**
   * Get all students enrolled in a course.
   * 
   * @param {number} courseId - The ID of the course to get students for.
   * @returns {Student[]|null} - An array of students enrolled in the course, or null if no students are found.
   * @throws {Error} - Throws an error if fetching students fails.
   */

  static async getStudentOfTheCourse(courseId){
    try{
    const query = `select * from students where studend_id IN (select student_id from enrollments where course_id =?)`
    const rows = await db.query(query ,[courseId]);
    return rows.length > 0 ? rows.map(Student.fromRow) : null;
    }catch(e){
      console.log(e);
      throw new Error(e);
    }

  }

  /**
   * Get instructor details by course ID.
   * 
   * @param {number} courseId - The ID of the course to get instructor details for.
   * @returns {Instructor[]} - An array of instructor objects associated with the course.
   * @throws {Error} - Throws an error if fetching instructor details fails.
   */


  static async getInstructorByCourseId(courseId) {
    try {
      const query = `SELECT * FROM instructors
                     WHERE instructor_id IN (SELECT instructor_id FROM courses WHERE course_id = ?)`;
      const rows = await db.query(query, [courseId]);
      return rows.map(Instructor.fromRow) ;
    } catch (error) {
      throw new Error("Error fetching instructor by course ID: " + error.message);
    }
  }

   /**
   * Check if a course exists by ID.
   * 
   * @param {number} courseId - The ID of the course to check.
   * @returns {boolean} - Returns true if the course exists, false otherwise.
   * @throws {Error} - Throws an error if checking the course existence fails.
   */


  static async courseExistsById(courseId) {
    try {
      const query = "SELECT * FROM courses WHERE course_id = ?";
      const rows = await db.query(query, [courseId]);
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error checking if course exists: " + error.message);
    }
  }
}

module.exports = CourseRepository;
