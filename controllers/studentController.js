const studentService = require("../services/studentService");
const courseService = require("../services/courseService");
const quizService = require("../services/quizService"); // Assuming you have a quiz service

/**
 * Middleware to protect student routes.
 * Ensures only logged-in students can access.
 */
const requireStudentLogin = (req, res, next) => {
  if (req.session.user && req.session.user.userType === "student") {
    next();
  } else if (req.session.user) {
    req.flash('error', 'You do not have permission to access the student dashboard.');
    return res.redirect(`/${req.session.user.userType}/dashboard`);
  } else {
    req.flash('error', 'Please log in to access the student dashboard.');
    res.redirect("/login");
  }
};

class StudentController {

  static async getAllStudents(req, res) {
    try {
      const students = await studentService.getAllStudents();
      return res.status(200).json({message:"The students are:",student:students});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Fetches a student by their ID.
   *  
   * @param {Object} req - The request object containing the student ID in params.
   * @param {Object} res - The response object.
   * @return {Promise<void>} - Returns a JSON response with the student data or an error message.
   * */
  
  static async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const student = await studentService.getStudentById(id);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }



  static async createStudent(req, res) {
    try {
      const { userId, stuFName, stuLName, dob, profilePicture } = req.body;
      let student = new Student(0, userId, stuFName, stuLName, dob, profilePicture);
      const newStudent = await studentService.createStudent(student);
      return res.status(201).json({message:`student created successufly`,student:newStudent});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { userId, stuFName, stuLName, dob, profilePicture } = req.body;
      let student = new Student(id, userId, stuFName, stuLName, dob, profilePicture);
      const updatedStudent = await studentService.updateStudent(student);
      return res.status(200).json({message:"student updated successufly",student:updatedStudent});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const deletedStudent = await studentService.deleteStudent(id);
      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getStudentCourses(req, res) {
    try {
      const { id } = req.params;
      const courses = await studentService.getStudentCourses(id);
      return res.status(200).json({message:"The courses are:",courses:courses});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Renders the student dashboard with their profile, enrolled courses, and quizzes.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async getStudentDashboard(req, res) {
    try {
      const userId = req.session.user.userId;
      console.log(`[StudentController.getStudentDashboard] Attempting to fetch student profile for userId: ${userId}`);

      const studentProfile = await studentService.getStudentByUserId(userId);

      if (!studentProfile) {
        console.warn(`[StudentController.getStudentDashboard] Student profile NOT found for userId: ${userId}. Redirecting.`);
        req.flash('error', 'Student profile not found. Please complete your student registration.');
        return res.redirect('/');
      }
      console.log(`[StudentController.getStudentDashboard] Student profile found: ${studentProfile.stuFName} ${studentProfile.stuLName}`);

      const enrolledCourses = await courseService.getStudentEnrolledCourses(studentProfile.studentId);
      console.log(`[StudentController.getStudentDashboard] Fetched ${enrolledCourses.length} enrolled courses.`);

      // This is the line causing the TypeError: quizService.getQuizzesByStudentId is not a function
      const studentQuizzes = await quizService.getQuizzesByStudentId(studentProfile.studentId);
      console.log(`[StudentController.getStudentDashboard] Fetched ${studentQuizzes.length} quizzes.`);

      console.log('[StudentController.getStudentDashboard] Attempting to render studentView.ejs');
      res.render('studentView', {
        title: 'Student Dashboard',
        user: req.session.user,
        student: studentProfile,
        courses: enrolledCourses,
        quizzes: studentQuizzes,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    } catch (error) {
      console.error('Error fetching student dashboard:', error);
      req.flash('error', 'Failed to load student dashboard. Please try again.');
      res.redirect('/');
    }
  }
}

module.exports = {
  StudentController,
  requireStudentLogin
};
