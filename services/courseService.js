const courseRepository = require('../repositories/courseRepository');
const Course = require('../models/courseModel');
const instructorRepository = require('../repositories/instructorRepository');
const categoryRepository = require('../repositories/categoryRepository');

/**
 * CourseService class provides methods for managing courses.
 * This includes actions like retrieving, creating, updating, and deleting courses.
 *
 * @class
 */
class CourseService {

  /**
   * Retrieves all courses.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of courses.
   * @throws {Error} Throws an error if there is an issue fetching courses.
   */
  static async getAllCourses() {
    try {
      const courses = await courseRepository.getAllCourses();
      return courses;
    } catch (error) {
      throw new Error('Error fetching courses: ' + error.message);
    }
  }

  /**
   * Retrieves a course by its ID.
   *
   * @param {number} id - The ID of the course to retrieve.
   * @returns {Promise<Object>} A promise that resolves to a course object.
   * @throws {Error} Throws an error if the course ID does not exist or if there's an issue fetching the course.
   */
  /*
  static async getCourseById(id) {
    try {
      if (!(await courseRepository.courseExistsById(id))) {
        throw new Error(`Course ID: ${id} does not exist`);
      }
      const course = await courseRepository.getCourseById(id);
      return course;
    } catch (error) {
      throw new Error('Error fetching course: ' + error.message);
    }
  }
*/
  /**
   * Retrieves the instructor associated with a specific course.
   *
   * @param {number} id - The ID of the course to retrieve the instructor for.
   * @returns {Promise<Object>} A promise that resolves to the instructor object associated with the course.
   * @throws {Error} Throws an error if the course ID does not exist or if there's an issue fetching the instructor.
   */
  static async getInstructorByCourseId(id) {
    try {
      if (!(await courseRepository.courseExistsById(id))) {
        throw new Error(`Course ID: ${id} does not exist`);
      }
      const courses = await courseRepository.getInstructorByCourseId(id);
      return courses;
    } catch (error) {
      throw new Error('Error fetching course: ' + error.message);
    }
  }

  /**
   * Creates a new course.
   *
   * @param {Object} course - The course object to be created.
   * @returns {Promise<Object>} A promise that resolves to the newly created course.
   * @throws {Error} Throws an error if there is an issue creating the course.
   */
  static async createCourse(course) {
    try {
      if (!(await instructorRepository.isInstructorExist(course.instructorId))) {
        throw new Error(`Instructor ID: ${course.instructorId} does not exist`);
      }
      if (!(await categoryRepository.isCategoryExists(course.categorieId))) {
        throw new Error(`Category ID: ${course.categorieId} does not exist`);
      }
      const newCourse = await courseRepository.createCourse(course);
      return newCourse;
    } catch (error) {
      throw new Error('Error creating course: ' + error.message);
    }
  }

  /**
   * Updates an existing course.
   *
   * @param {Object} courseData - The course data to be updated.
   * @returns {Promise<Object>} A promise that resolves to the updated course.
   * @throws {Error} Throws an error if the course ID does not exist or if there's an issue updating the course.
   */
  static async updateCourse(courseData) {
    try {
      if (!(await courseRepository.courseExistsById(courseData.courseId))) {
        throw new Error(`Course ID: ${courseData.courseId} does not exist`);
      }
      if (!(await instructorRepository.isInstructorExist(courseData.instructorId))) {
        throw new Error(`Instructor ID: ${courseData.instructorId} does not exist`);
      }
      if (!(await categoryRepository.isCategoryExists(courseData.categorieId))) {
        throw new Error(`Category ID: ${courseData.categorieId} does not exist`);
      }
      const updatedCourse = await courseRepository.updateCourse(courseData);
      return updatedCourse;
    } catch (error) {
      console.log(error);
      throw new Error('Error updating course: ' + error.message);
    }
  }

  /**
   * Retrieves the students enrolled in a specific course.
   *
   * @param {number} courseId - The ID of the course to get the students for.
   * @returns {Promise<Array>} A promise that resolves to an array of students enrolled in the course.
   * @throws {Error} Throws an error if the course ID does not exist or if there's an issue fetching the students.
   */
  static async getStudentOfTheCourse(courseId) {
    try {
      if (!(await courseRepository.courseExistsById(courseId))) {
        throw new Error(`Course ID: ${courseId} does not exist`);
      }
      const sdOfCourse = await courseRepository.getStudentOfTheCourse(courseId);
      return sdOfCourse;
    } catch (e) {
      console.log(e);
      throw new Error('Error in getting students of the course :' + e.message);
    }
  }

  /**
   * Deletes a course by its ID.
   *
   * @param {number} id - The ID of the course to delete.
   * @returns {Promise<void>} A promise that resolves when the course is deleted.
   * @throws {Error} Throws an error if the course ID does not exist or if there's an issue deleting the course.
   */
  static async deleteCourse(id) {
    try {
      if (!(await courseRepository.courseExistsById(id))) {
        throw new Error(`Course ID: ${id} does not exist`);
      }
      await courseRepository.deleteCourse(id);
    } catch (error) {
      throw new Error('Error deleting course: ' + error.message);
    }
  }

// Inside services/courseService.js

/**
 * Gets all courses taught by a specific instructor.
 * This function calls the CourseRepository to retrieve the data.
 * @param {number} instructorId - The ID of the instructor.
 * @returns {Promise<Course[]>} An array of Course objects.
 * @throws {Error} If fetching courses fails.
 */
static async getCoursesByInstructorId(instructorId) {
    try {
        return await courseRepository.getCoursesByInstructorId(instructorId);
    } catch (error) {
        throw new Error("Error fetching courses by instructor from service: " + error.message);
    }
}

  /**
   * @async
   * @description Retrieves all courses a specific student is enrolled in.
   * @param {number} studentId - The ID of the student.
   * @returns {Promise<Array>} A promise that resolves to an array of course objects.
   * @throws {Error} Throws an error if there's an issue fetching the courses.
   */
  static async getStudentEnrolledCourses(studentId) {
    try {
      // You'll need to implement this method in your courseRepository.js as well.
      // It should likely join your 'courses' table with your 'enrollments' table.
      const courses = await courseRepository.getStudentEnrolledCourses(studentId);
      return courses;
    } catch (error) {
      throw new Error('Error fetching enrolled courses for student: ' + error.message);
    }
  }

  /**
   * @async
   * @description Retrieves the total count of courses.
   * @returns {Promise<number>} A promise that resolves to the total number of courses.
   * @throws {Error} Throws an error if there's an issue fetching the count.
   */
  static async getTotalCourses() {
    try {
      const count = await courseRepository.getTotalCourses(); // Assuming this method exists in repository
      return count;
    } catch (error) {
      throw new Error('Error fetching total course count: ' + error.message);
    }
  }

    static async getCourseById(courseId) {
    

        const courseData = await courseRepository.getCourseById(courseId); // Pass the already-numeric ID
        if (!courseData) {
            throw new Error(`Course ID: ${courseId} does not exist`); // Use the numeric ID in error message
        }
        return courseData 
    }
}

module.exports = CourseService;
