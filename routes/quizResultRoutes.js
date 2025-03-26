const express = require('express');
const quizResultController = require('../controllers/quizResultController');
const {validateResult, validateResultId} = require('../validators/results.dto');

const router = express.Router();

router.get('/', quizResultController.getAllResults);
router.get('/:id',validateResultId, quizResultController.getResultById);
router.post('/',validateResult, quizResultController.createResult);
router.put('/:id', validateResultId,validateResult,quizResultController.updateResult);
router.delete('/:id',validateResultId, quizResultController.deleteResult);

module.exports = router;