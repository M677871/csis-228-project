const express = require('express');
const quizAnswerController = require('../controllers/quizAnswerController');
const {validateAnswer, validateAnswerId} = require('../validators/answer.dto');

const router = express.Router();

router.get('/', quizAnswerController.getAllAnswers);
router.get('/:id',validateAnswerId, quizAnswerController.getAnswerById);
router.post('/',validateAnswer, quizAnswerController.createAnswer);
router.put('/:id',validateAnswerId,validateAnswer, quizAnswerController.updateAnswer);
router.delete('/:id',validateAnswerId, quizAnswerController.deleteAnswer);

module.exports = router;