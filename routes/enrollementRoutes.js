const express = require('express');
const enrollmentController = require('../controllers/enrollementController');
const {validateEnrollement, validateEnrollementId} = require('../validators/enrollement.dto');
const router = express.Router();

router.get('/create-enrollment' , enrollmentController.showEnrollementForm);
router.post ('/create-enrollment' , enrollmentController.createEnrollementForm);

router.get('/', enrollmentController.getEnrollements);
router.get('/:id',validateEnrollementId, enrollmentController.getEnrollementById);
router.post('/',validateEnrollement, enrollmentController.createEnrollement);
router.put('/:id',validateEnrollementId,validateEnrollement, enrollmentController.updateEnrollement);
router.delete('/:id',validateEnrollementId, enrollmentController.deleteEnrollement);

module.exports = router;