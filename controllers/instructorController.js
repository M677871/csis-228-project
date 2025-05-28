const instructorService = require('../services/instructorService');
const Instructor = require('../models/instructorModel');
const courseService = require('../services/courseService');

/**
 * Middleware to protect instructor routes.
 * Ensures only logged-in instructors can access.
 */
const requireInstructorLogin = (req, res, next) => {
  if (req.session.user && req.session.user.userType === "instructor") {
    next();
  } else if (req.session.user) {
    req.flash('error', 'You do not have permission to access the instructor dashboard.');
    return res.redirect(`/${req.session.user.userType}/dashboard`);
  } else {
    req.flash('error', 'Please log in to access the instructor dashboard.');
    res.redirect("/login");
  }
};

class InstructorController {

  static async getAllInstructors(req, res) {
    try {
      const instructors = await instructorService.getInstructors();
      return res.status(200).json(instructors);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getInstructorById(req, res) {
    try {
      const { id } = req.params;
      const instructor = await instructorService.getInstructorById(id);
      return res.status(200).json(instructor);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async createInstructor(req, res) {
    try {
      const { userId, insFName, insLName, bio, profilePicture } = req.body;
      let instructor = new Instructor(0, userId, insFName, insLName, bio, profilePicture);
      const newInstructor = await instructorService.createInstructor(instructor);
      return res.status(201).json({ message: `instructor created successuflly`, instructor: newInstructor });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateInstructor(req, res) {
    try {
      const { id } = req.params;
      const { userId, insFName, insLName, bio, profilePicture } = req.body;
      let instructor = new Instructor(id, userId, insFName, insLName, bio, profilePicture)
      const updatedInstructor = await instructorService.updateInstructor(instructor);
      return res.status(200).json({ message: `instructor updated successufly`, instructor: updatedInstructor });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteInstructor(req, res) {
    try {
      const { id } = req.params;
      const deletedInstructor = await instructorService.deleteInstructor(id);
      return res.status(200).json({ message: 'Instructor deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getInstructorCourses(req, res) {
    try {
      const { id } = req.params;
      const courses = await instructorService.getInstruvtorCourses(id);
      return res.status(200).json({ message: `the instructor courses`, instructorCourses: courses })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Renders the instructor dashboard with relevant data.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getInstructorDashboard(req, res) {
    try {
      const instructorUserId = req.session.user.userId; // Get user ID from session
      console.log(`[InstructorController.getInstructorDashboard] Attempting to fetch instructor profile for userId: ${instructorUserId}`);

      const instructorProfile = await instructorService.getInstructorByUserId(instructorUserId); // <--- FIX: Use getInstructorByUserId

      if (!instructorProfile) {
        console.warn(`[InstructorController.getInstructorDashboard] Instructor profile NOT found for userId: ${instructorUserId}. Redirecting.`);
        req.flash('error', 'Instructor profile not found. Please complete your instructor registration.');
        return res.redirect('/'); // Redirect to home or a specific profile setup page
      }
      console.log(`[InstructorController.getInstructorDashboard] Instructor profile found: ${instructorProfile.insFName} ${instructorProfile.insLName}`);


      const taughtCourses = await courseService.getCoursesByInstructorId(instructorProfile.instructorId); // Use instructorId from profile
      console.log(`[InstructorController.getInstructorDashboard] Fetched ${taughtCourses.length} courses for instructor.`);

      console.log('[InstructorController.getInstructorDashboard] Attempting to render instructorView.ejs');
      res.render('instructorView', {
        title: 'Instructor Dashboard',
        user: req.session.user,
        instructor: instructorProfile,
        courses: taughtCourses,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    } catch (error) {
      console.error('Error fetching instructor dashboard:', error);
      req.flash('error', 'Failed to load instructor dashboard. Please try again.');
      res.redirect('/');
    }
  }
}

module.exports = {
  InstructorController,
  requireInstructorLogin
};
