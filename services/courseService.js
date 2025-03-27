const courseRepository = require('../repositories/courseRepository');

class CourseService {
  static async getAllCourses() {
    try {
      const courses = await courseRepository.getAllCourses();
      return courses;
    } catch (error) {
      throw new Error('Error fetching courses: ' + error.message);
    }
  }

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
  static async createCourse(course) {
    try {
      const newCourse = await courseRepository.createCourse(course);
      return newCourse;
    } catch (error) {
      throw new Error('Error creating course: ' + error.message);
    }
  }

  static async updateCourse( courseData) {
    try {
      
      if (!(await courseRepository.courseExistsById(course.courseId))) {
        throw new Error(`Course ID: ${id} does not exist`);
      }
      const updatedCourse = await courseRepository.updateCourse(courseData);
      return updatedCourse;
    } catch (error) {
      throw new Error('Error updating course: ' + error.message);
    }
  }

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
}
module.exports = CourseService;