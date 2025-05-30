// routes/courseRoutes.js

const express = require('express');
const courseController = require('../controllers/courseController');
const {validateCourse, validateCourseId} = require('../validators/course.dto');
const router = express.Router();

// Frontend Route for Browsing Courses (e.g., for students or public)
router.get('/view-courses' , courseController.loadCoursesView);

// General Course API Endpoints (CRUD and specific queries)
router.get('/instructorByCourseId/:id', courseController.getInstructorByCourseId);
router.get('/stdOfCourse/:id', courseController.getStudentsOfCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', validateCourseId, courseController.getCourseById);
router.post('/', validateCourse, courseController.createCourse); // This is a general API for creating a course, distinct from instructor form
router.put('/:id', validateCourseId, validateCourse, courseController.updateCourse);
router.delete('/:id', validateCourseId, courseController.deleteCourse);

// --- REMOVED ROUTES ---
// The following routes were removed because the instructor's course creation workflow
// is now handled by the 'instructorRoutes.js' file:
// router.get('/create-course' , courseController.showCourseForm);
// router.post ('/create-course' , courseController.createCourseForm);

module.exports = router;
