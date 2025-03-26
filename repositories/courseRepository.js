const db = require("../config/db");
const Course = require("../models/courseModel");
const moment = require("moment");
class CourseRepository {
  // Create a new course
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

  // Get course by ID
  static async getCourseById(courseId) {
    try {
      const query = "SELECT * FROM courses WHERE course_id = ?";
      const rows = await db.query(query, [courseId]);
      return Course.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching course: " + error.message);
    }
  }

  // Get all courses
  static async getAllCourses() {
    try {
      const query = "SELECT * FROM courses";
      const rows = await db.query(query);
      return rows.map(Course.fromRow);
    } catch (error) {
      throw new Error("Error fetching all courses: " + error.message);
    }
  }

  // Update course information
  static async updateCourse(course) {
    try {
      const query = `UPDATE courses SET instructor_id=?, categorie_id=?, course_name=?, description=?,create_at=? WHERE course_id = ?`;
      const { affectedRows } = await db.query(query, [
        course.instructorId,
        course.categorieId,
        course.courseName,
        course.description,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        course.courseId
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error updating course: " + error.message);
    }
  }

  // Delete a course
  static async deleteCourse(courseId) {
    try {
      const query = "DELETE FROM courses WHERE course_id = ?";
      const { affectedRows } = await db.query(query, [courseId]);
      return affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting course: " + error.message);
    }
  }

  // Check if a course exists by ID
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
