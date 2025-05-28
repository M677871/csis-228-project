const express = require('express');
const enrollmentController = require('../controllers/enrollementController');
const {validateEnrollement, validateEnrollementId} = require('../validators/enrollement.dto');
const router = express.Router();

router.get('/create-enrollment' , enrollmentController.showEnrollementForm); // This route is likely for an admin to manually create an enrollment form
router.post ('/create-enrollment' , enrollmentController.createEnrollementForm); // This is the target for the "Enroll Now" button

router.get('/', enrollmentController.getEnrollements);
router.get('/:id',validateEnrollementId, enrollmentController.getEnrollementById);
router.post('/',validateEnrollement, enrollmentController.createEnrollement); // This is likely for API calls, not direct form submission
router.put('/:id',validateEnrollementId,validateEnrollement, enrollmentController.updateEnrollement);
router.delete('/:id',validateEnrollementId, enrollmentController.deleteEnrollement);

module.exports = router;
