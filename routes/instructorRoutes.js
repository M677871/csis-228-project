const express = require('express');
const { InstructorController, requireInstructorLogin } = require('../controllers/instructorController');
const { validateInstructor, validateInstructorId } = require('../validators/instructor.dto');
const router = express.Router();

// Instructor Dashboard
router.get('/dashboard', requireInstructorLogin, InstructorController.getInstructorDashboard);

// Course Creation Forms
router.get('/courses/new', requireInstructorLogin, InstructorController.showCreateCourseForm);
router.post('/courses', requireInstructorLogin, InstructorController.createCourse);

// Add Material Form (Display)
router.get('/courses/:courseId/materials/new', requireInstructorLogin, InstructorController.showAddMaterialForm);

// Handle Add Material Submission (POST) - This is where the form from addCourseMaterial.ejs submits
// It calls InstructorController.addMaterial
router.post('/courses/:courseId/materials', requireInstructorLogin, InstructorController.addMaterial); // ADDED THIS ROUTE

// Existing API routes for general instructor management (keep these)
router.get('/', InstructorController.getAllInstructors);
router.get('/:id', validateInstructorId, InstructorController.getInstructorById);
router.get('/courses/:id', validateInstructorId, InstructorController.getInstructorCourses);
router.post('/', validateInstructor, InstructorController.createInstructor);
router.put('/:id', validateInstructorId, validateInstructor, InstructorController.updateInstructor);
router.delete('/:id', validateInstructorId, InstructorController.deleteInstructor);


module.exports = router;
