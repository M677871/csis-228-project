const express = require("express");
const { StudentController, requireStudentLogin } = require("../controllers/studentController"); // Import both controller and middleware
const { validateStudent, validateStudentId } = require("../validators/student.dto");
const router = express.Router();

// Frontend route for the student dashboard
// This route is protected by the requireStudentLogin middleware
router.get('/dashboard', requireStudentLogin, StudentController.getStudentDashboard);

// API routes (these are generally for data fetching/manipulation, not direct view rendering)
router.get("/", StudentController.getAllStudents); // Get all students (might be for admin API)
router.get("/:id", validateStudentId, StudentController.getStudentById); // Get student by ID (API)
router.get("/studentCourses/:id", validateStudentId, StudentController.getStudentCourses); // Get courses by student ID (API)
router.post("/", validateStudent, StudentController.createStudent); // Create student (API)
router.put("/:id", validateStudentId, validateStudent, StudentController.updateStudent); // Update student (API)
router.delete("/:id", validateStudentId, StudentController.deleteStudent); // Delete student (API)

// --- REMOVED/REPLACED ROUTES ---
// The following routes are now handled by the /dashboard route or are API-only:
// router.get('/studentCourses/:id' , studentController.loadStudentCourses); // Replaced by getStudentDashboard
// router.get('/studentView', studentController.showStudentForm); // Replaced by getStudentDashboard
// router.get('studentView',studentController.loadStudentsView); // Replaced by getStudentDashboard
// router.get('/:id/dashboard', studentController.loadStudentsView); // Replaced by /dashboard and logic in getStudentDashboard

module.exports = router;
