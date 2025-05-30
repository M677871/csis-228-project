const courseService = require("../services/courseService");
const categoryService = require("../services/categoryService");
const Course = require("../models/courseModel");
const moment = require("moment");

/**
 * @class CourseController
 * @description This class handles the management of courses,
 * including retrieving, creating, updating, and deleting courses.
 */

class CourseController {

  /**
   * @async
   * @description Retrieves all courses.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing all courses.
   */

  static async getAllCourses(req, res) {
    try {
      const courses = await courseService.getAllCourses();
     return res.status(200).json(courses);
    } catch (error) {
    return  res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a specific course by its unique ID.
   * @param {Object} req - The request object containing the course ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the course data.
   */

  static async getCourseById(req, res) {
    try {
      const { id } = req.params;

      const course = await courseService.getCourseById(id);

      res.status(200).json(course);
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Creates a new course.
   * @param {Object} req - The request object containing course details
   * (instructorId, categorieId, courseName, description).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the newly created course.
   */

  static async createCourse(req, res) {
    try {
      const { instructorId, categorieId, courseName, description } = req.body;

      let course = new Course(
        0,
        instructorId,
        categorieId,
        courseName,
        description,
        moment().format("YYYY-MM-DD ")
      );
      const result = await courseService.createCourse(course);
    return  res.status(201).json({message:`created course successuflly`, course:result});
    } catch (error) {
    return  res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Updates an existing course by its unique ID.
   * @param {Object} req - The request object containing the course ID
   * in the params and updated details in the body (instructorId, categorieId, courseName, description).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated course.
   */

  static async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { instructorId, categorieId, courseName, description } = req.body;

      let updateCourse = new Course(
        id,
        instructorId,
        categorieId,
        courseName,
        description,
        moment().format("YYYY-MM-DD HH:mm:ss")
      );
      const result = await courseService.updateCourse(updateCourse);
    return  res.status(200).json({message:`updated course successuflly`, course:result});
    } catch (error) {
    return  res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Deletes a course by its unique ID.
   * @param {Object} req - The request object containing the course ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response indicating successful deletion of the course.
   */

  static async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const deletedCourse = await courseService.deleteCourse(id);


        res
          .status(200)
          .json({
            message: "Course deleted successfully",
            course: deletedCourse,
          });

    } catch (error) {
    return  res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves the instructor of a specific course.
   * @param {Object} req - The request object containing the course ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the course instructor's data.
   */

  static async getInstructorByCourseId(req, res) {
    try {
      const { id } = req.params;

      const course = await courseService.getInstructorByCourseId(id);

      res.status(200).json({message:`the instructor of the course :`, course:course});
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves all students enrolled in a specific course.
   * @param {Object} req - The request object containing the course ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the list of students enrolled in the course.
   */

  static async getStudentsOfCourse(req, res) {
    try {
      const { id } = req.params;

      const students = await courseService.getStudentOfTheCourse(id);

      res.status(200).json({message:`the students of the course are :`, students:students});
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Loads the courses view, categorized by category.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async loadCoursesView(req, res) {
    try {
      const cats = await categoryService.getAllCategories();
      const categories = [];

      for (const cat of cats) {
        const courses = await categoryService.getCategoryCourses(cat.categoryId);
        // Assuming getCategoryCourses returns courses with instructorName and price
        if (courses.length) {
          categories.push({ category: cat, courses });
        }
      }

      // Pass flash messages and the user object to the EJS template
      return res.render('courses', {
        categories,
        user: req.session.user, // Explicitly pass the user object
        success: req.flash('success'), // For enrollment success messages
        error: req.flash('error') // For enrollment error messages
      });
    } catch (error) {
      console.error("Error fetching category courses:", error);
      // Pass error message to the view
      return res.status(500).render('error', {
        message: 'Failed to load courses. Please try again later.',
        user: req.session.user // Pass user even on error pages
      });
    }
  }


static showCourseForm(req, res) {
  try {

  res.render("createCourse.ejs", { error: null });
  }
  catch (error) {
    console.error("Error rendering course form:", error);
    return res.status(500).send("Internal Server Error");
  }
}

static async createCourseForm(req, res) {
  try {
    const { instructorId, categorieId, courseName, description } = req.body;

    let course = new Course(
      0,
      instructorId,
      categorieId,
      courseName,
      description,
      moment().format("YYYY-MM-DD ")
    );
    const result = await courseService.createCourse(course);

    return res.redirect("/api/material/create-material");
  } catch (error) {
    console.error("Error during course creation:", error);
    return res.render("createCourse.ejs", {
      error: "Course creation failed. Please try again.",
    });
  }
}




}

module.exports = CourseController;
