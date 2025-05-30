const db = require("../config/db"); // Assuming db is your connection pool or wrapper
const Course = require("../models/courseModel");
const Instructor = require("../models/instructorModel");
const Student = require('../models/studentModel');
const moment = require("moment");

/**
 * The `CourseRepository` class provides a set of static methods
 * to interact with the `courses` table in the database.
 * It includes operations such as creating, updating, deleting, retrieving,
 * and checking for courses, as well as retrieving associated instructors and students.
 *
 * @class
 */
class CourseRepository {

    /**
     * Create a new course.
     *
     * @param {Object} course - The course object containing course details.
     * @returns {number} - The `insertId` of the newly created course.
     * @throws {Error} - Throws an error if the course creation fails.
     */
    static async createCourse(course) {
        try {
            const query = `INSERT INTO courses (instructor_id, categorie_id, course_name, description, create_at, image) VALUES (?, ?, ?, ?, ?, ?)`;
            // Assuming db.query returns an object with an 'insertId' property for INSERT statements
            const result = await db.query(query, [
                course.instructorId,
                course.categorieId,
                course.courseName,
                course.description,
                course.createAt,
                course.image || '/images/default.png' // Add default image if not provided
            ]);
            // CRITICAL FIX: Return the insertId from the database operation
            return result.insertId;
        } catch (error) {
            console.error("Error in CourseRepository.createCourse:", error);
            throw new Error("Error creating course: " + error.message);
        }
    }

    /**
     * Get course details by ID.
     *
     * @param {number} courseId - The ID of the course to fetch.
     * @returns {Course|null} - The course object populated with the course details, or null if not found.
     * @throws {Error} - Throws an error if fetching the course fails.
     */
    static async getCourseById(courseId) {
        try {
            const query = "SELECT * FROM courses WHERE course_id = ?";
            const rows = await db.query(query, [courseId]);
            // CRITICAL FIX: Check if a row was returned before calling fromRow
            if (rows.length === 0) {
                return null; // No course found with this ID
            }
            return Course.fromRow(rows[0]);
        } catch (error) {
            console.error("Error in CourseRepository.getCourseById:", error);
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
            console.error("Error in CourseRepository.getAllCourses:", error);
            throw new Error("Error fetching all courses: " + error.message);
        }
    }

    /**
     * Update the information of a course.
     *
     * @param {Object} course - The course object containing the updated course details.
     * @returns {number} - The number of affected rows, indicating the success of the operation.
     * @throws {Error} - Throws an error if updating the course fails.
     */
    static async updateCourse(course) {
        try {
            const query = `UPDATE courses SET instructor_id=?, categorie_id=?, course_name=?, description=?, create_at=?, image=? WHERE course_id = ?`;
            const result = await db.query(query, [
                course.instructorId,
                course.categorieId,
                course.courseName,
                course.description,
                course.createAt,
                course.image || '/images/default.png', // Add default image if not provided
                course.courseId
            ]);
            return result.affectedRows;
        } catch (error) {
            console.error("Error in CourseRepository.updateCourse:", error);
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
            const result = await db.query(query, [courseId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in CourseRepository.deleteCourse:", error);
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
    static async getStudentOfTheCourse(courseId) {
        try {
            const query = `SELECT * FROM students WHERE student_id IN (SELECT student_id FROM enrollments WHERE course_id = ?)`;
            const rows = await db.query(query, [courseId]);
            return rows.length > 0 ? rows.map(Student.fromRow) : null;
        } catch (e) {
            console.error("Error in getStudentOfTheCourse:", e);
            throw new Error(e.message); // Re-throw with message
        }
    }

    /**
     * Get instructor details by course ID.
     *
     * @param {number} courseId - The ID of the course to get instructor details for.
     * @returns {Instructor[]|null} - An array of instructor objects associated with the course, or null if not found.
     * @throws {Error} - Throws an error if fetching instructor details fails.
     */
    static async getInstructorByCourseId(courseId) {
        try {
            const query = `SELECT * FROM instructors
                           WHERE instructor_id IN (SELECT instructor_id FROM courses WHERE course_id = ?)`;
            const rows = await db.query(query, [courseId]);
            return rows.length > 0 ? rows.map(Instructor.fromRow) : null;
        } catch (error) {
            console.error("Error in getInstructorByCourseId:", error);
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
            return rows.length > 0; // Returns true if rows exist, false otherwise
        } catch (error) {
            console.error("Error in courseExistsById:", error);
            throw new Error("Error checking if course exists: " + error.message);
        }
    }

    static async getTotalCourses() {
        try {
            const query = "SELECT COUNT(*) as total FROM courses";
            const rows = await db.query(query);
            return rows[0].total;
        } catch (error) {
            console.error("Error in getTotalCourses:", error);
            throw new Error("Error fetching total courses: " + error.message);
        }
    }

    static async getStudentEnrolledCourses(studentId) {
        try {
            const query = `
                SELECT
                    c.course_id,
                    c.course_name,
                    c.description,
                    c.create_at AS createdDate,
                    c.image,
                    ins.ins_fname AS instructorFName,
                    ins.ins_lname AS instructorLName,
                    u.email AS instructorEmail
                FROM courses c
                JOIN enrollments e ON c.course_id = e.course_id
                JOIN instructors ins ON c.instructor_id = ins.instructor_id
                JOIN users u ON ins.user_id = u.user_id
                WHERE e.student_id = ?;
            `;
            const rows = await db.query(query, [studentId]);
            return rows.map(row => ({
                courseId: row.course_id,
                courseName: row.course_name,
                description: row.description,
                createdDate: row.createdDate,
                image: row.image,
                instructorName: `${row.instructorFName} ${row.instructorLName}`,
                instructorEmail: row.instructorEmail
            }));
        } catch (error) {
            console.error("Error in getStudentEnrolledCourses:", error);
            throw new Error("Error fetching enrolled courses for student from repository: " + error.message);
        }
    }

    /**
     * @async
     * @description Retrieves all courses taught by a specific instructor from the database.
     * @param {number} instructorId - The `instructor_id` of the instructor.
     * @returns {Promise<Array<Course>>} A promise that resolves to an array of Course objects.
     * @throws {Error} Throws an error if there's an issue fetching the courses.
     */
    static async getCoursesByInstructorId(instructorId) {
        try {
            const query = `
                SELECT c.*
                FROM courses c
                WHERE c.instructor_id = ?;
            `;
            console.log('[CourseRepository.getCoursesByInstructorId] Executing query:', query, [instructorId]);
            const rows = await db.query(query, [instructorId]);
            console.log('[CourseRepository.getCoursesByInstructorId] Raw rows from DB:', rows);
            return rows.map(Course.fromRow); // Map database rows to Course model objects
        } catch (error) {
            console.error('Error in CourseRepository.getCoursesByInstructorId:', error);
            throw new Error("Error fetching courses by instructor ID from repository: " + error.message);
        }
    }
}

module.exports = CourseRepository;
