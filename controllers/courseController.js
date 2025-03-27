const courseService = require("../services/courseService");
const Course = require("../models/courseModel");
const moment = require("moment");
class CourseController {
  static async getAllCourses(req, res) {
    try {
      const courses = await courseService.getAllCourses();
     return res.status(200).json(courses);
    } catch (error) {
    return  res.status(500).json({ message: error.message });
    }
  }

  static async getCourseById(req, res) {
    try {
      const { id } = req.params;
      
      const course = await courseService.getCourseById(id);
     
      res.status(200).json(course);
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  static async createCourse(req, res) {
    try {
      const { instructorId, categorieId, courseName, description } = req.body;
     
      let course = new Course(
        0,
        instructorId,
        categorieId,
        courseName,
        description,
        moment().format("YYYY-MM-DD")
      );
      const result = await courseService.createCourse(course);
    return  res.status(201).json({message:`created course successuflly`, course:result});
    } catch (error) {
    return  res.status(500).json({ message: error.message });
    }
  }

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
        moment().format("YYYY-MM-DD")
      );
      const result = await courseService.updateCourse(updateCourse);
    return  res.status(200).json({message:`updated course successuflly`, course:result});
    } catch (error) {
    return  res.status(500).json({ message: error.message });
    }
  }

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
  static async getInstructorByCourseId(req, res) {
    try {
      const { id } = req.params;
      
      const course = await courseService.getInstructorByCourseId(id);
     
      res.status(200).json({message:`the instructor of the course :`, course:course});
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CourseController;
