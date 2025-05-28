const enrollementService = require("../services/enrollementService");
const Enrollement = require("../models/enrollementModel");
const moment = require('moment');

/**
 * @class EnrollementController
 * @description This class manages the enrollement processes,
 * including creating, retrieving, updating, and deleting enrollements.
 */

class EnrollementController {

  /**
   * @async
   * @description Creates a new enrollement in the system.
   * @param {Object} req - The request object containing the studentId, courseId, and status for the new enrollement.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the result of the enrollement creation.
   */

  static async createEnrollement(req, res) {
    try {
      const { studentId, courseId, status } = req.body;

      let enrollement = new Enrollement(
        0,
        studentId,
        courseId,
        status,
        moment().format("YYYY-MM-DD")
      );
      const result = await enrollementService.createEnrollement(enrollement);
      res.status(201).json({message :`enrollement created successufly`,resust:result});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves all enrollements from the system.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the list of all enrollements.
   */

  static async getEnrollements(req, res) {
    try {
      const enrollements = await enrollementService.getAllEnrollements();
      res.status(200).json(enrollements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a specific enrollement by its unique ID.
   * @param {Object} req - The request object containing the enrollement ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the enrollement data.
   */

  static async getEnrollementById(req, res) {
    try {
      const { id } = req.params;

      const enrollement = await enrollementService.getEnrollementById(id);

      res.status(200).json(enrollement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Updates an existing enrollement in the system.
   * @param {Object} req - The request object containing the enrollement ID in the params and
   *  updated data in the body (studentId, courseId, status).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated enrollement data.
   */

  static async updateEnrollement(req, res) {
    try {
      const {id} = req.params;

      const { studentId, courseId, status } = req.body;

      let enrollement = new Enrollement(
        id,
        studentId,
        courseId,
        status,
        moment().format("YYYY-MM-DD")
      );

      const result = await enrollementService.updateEnrollement(enrollement);

      return res.status(200).json({message :`enrollement updated successufly`,resust:result});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Deletes an enrollement from the system by its unique ID.
   * @param {Object} req - The request object containing the enrollement ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response indicating successful deletion of the enrollement.
   */

  static async deleteEnrollement(req, res) {
    try {
      const { id } = req.params;

      await enrollementService.deleteEnrollement(id);
      return res
        .status(200)
        .json({ message: "Enrollement deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


  static showEnrollementForm(req, res) {
    try {

    res.render("createEnrollement.ejs", { error: null });
    }
    catch (error) {
      console.error("Error rendering course form:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  /**
   * @async
   * @description Handles the creation of an enrollment from the frontend.
   * Automatically uses studentId from session.
   * @param {Object} req - The request object containing courseId in the body.
   * @param {Object} res - The response object.
   */
  static async createEnrollementForm(req, res) {
    try {
      // 1. Get studentId from session
      const studentId = req.session.user ? req.session.user.userId : null;
      const { courseId } = req.body;
      const status = "enrolled"; // Default status for new enrollments

      // Basic validation
      if (!studentId) {
        req.flash('error', 'You must be logged in as a student to enroll in a course.');
        return res.redirect('/login'); // Redirect to login if studentId is missing
      }
      if (!courseId) {
        req.flash('error', 'Course ID is missing. Cannot enroll.');
        return res.redirect('/api/course/view-courses'); // Redirect back to courses page
      }

      let enrollement = new Enrollement(
        0, // Assuming 0 or null for auto-incremented ID
        studentId,
        courseId,
        status,
        moment().format("YYYY-MM-DD")
      );

      const result = await enrollementService.createEnrollement(enrollement);

      if (result) {
        req.flash('success', 'Successfully enrolled in the course!');
        return res.redirect("/student/dashboard"); // Redirect to student dashboard
      } else {
        req.flash('error', 'Enrollment failed. This might be a duplicate enrollment or an issue with the course/student data.');
        return res.redirect("/api/course/view-courses"); // Redirect back to courses page
      }

    } catch (error) {
      console.error("Error during Enrollment creation:", error);
      req.flash('error', 'An unexpected error occurred during enrollment. Please try again.');
      return res.redirect("/api/course/view-courses"); // Redirect back to courses page
    }
  }
}

module.exports = EnrollementController;
