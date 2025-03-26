const express = require('express');
const instructorController = require('../controllers/instructorController');
const {validateInstructor, validateInstructorId} = require('../validators/instructor.dto');
const router = express.Router();


router.get('/', instructorController.getAllInstructors);
router.get('/:id',validateInstructorId, instructorController.getInstructorById);
router.get('/courses/:id',validateInstructorId,instructorController.getInstructorCourses);
router.post('/',validateInstructor, instructorController.createInstructor);
router.put('/:id', validateInstructorId,validateInstructor,instructorController.updateInstructor);
router.delete('/:id',validateInstructorId, instructorController.deleteInstructor);

module.exports = router;