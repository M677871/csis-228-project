const express = require('express');
const quizQuestionController = require('../controllers/quizQuestionController');
const {validateQuestion, validateQuestionId} = require('../validators/question.dto');

const router = express.Router();


router.get('/', quizQuestionController.getAllQuestions);
router.get('/:id',validateQuestionId, quizQuestionController.getQuestionById);
router.post('/', validateQuestion,quizQuestionController.createQuestion);
router.put('/:id',validateQuestionId,validateQuestion, quizQuestionController.updateQuestion);
router.delete('/:id',validateQuestionId, quizQuestionController.deleteQuestion);

module.exports = router;