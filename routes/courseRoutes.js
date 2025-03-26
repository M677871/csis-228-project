const express = require('express');
const courseController = require('../controllers/courseController');
const {validateCourse, validateCourseId} = require('../validators/course.dto');
const router = express.Router();

router.get('/', courseController.getAllCourses);
router.get('/:id',validateCourseId, courseController.getCourseById);
router.post('/',validateCourse, courseController.createCourse);
router.put('/:id',validateCourseId,validateCourse, courseController.updateCourse);
router.delete('/:id',validateCourseId, courseController.deleteCourse);

module.exports = router;