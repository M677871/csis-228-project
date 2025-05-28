const express = require('express');
const { InstructorController, requireInstructorLogin } = require('../controllers/instructorController'); // Import both controller and middleware
const { validateInstructor, validateInstructorId } = require('../validators/instructor.dto');
const router = express.Router();

// Frontend route for the instructor dashboard
// This route is protected by the requireInstructorLogin middleware
router.get('/dashboard', requireInstructorLogin, InstructorController.getInstructorDashboard);

// API routes (these are generally for data fetching/manipulation, not direct view rendering)
router.get('/', InstructorController.getAllInstructors); // Get all instructors (might be for admin API)
router.get('/:id', validateInstructorId, InstructorController.getInstructorById); // Get instructor by ID (API)
router.get('/courses/:id', validateInstructorId, InstructorController.getInstructorCourses); // Get courses by instructor ID (API)
router.post('/', validateInstructor, InstructorController.createInstructor); // Create instructor (API)
router.put('/:id', validateInstructorId, validateInstructor, InstructorController.updateInstructor); // Update instructor (API)
router.delete('/:id', validateInstructorId, InstructorController.deleteInstructor); // Delete instructor (API)

// --- REMOVED/REPLACED ROUTES ---
// The following routes are now handled by the /dashboard route or are API-only:
// router.get('/instructorCourses/:id', instructorController.loadInstructorCourses); // Replaced by getInstructorDashboard
// router.get('/instructorView', instructorController.showInstructorForm); // Replaced by getInstructorDashboard


module.exports = router;
