const express = require('express');
const quizController = require('../controllers/quizController');
const {validateQuiz, validateQuizId} = require('../validators/quiz.dto');

const router = express.Router();

router.get('/', quizController.getAllQuizzes);
router.get('/:id', validateQuizId, quizController.getQuizById);
router.post('/', validateQuiz, quizController.createQuiz);
router.put('/:id', validateQuizId, validateQuiz, quizController.updateQuiz);
router.delete('/:id', validateQuizId, quizController.deleteQuiz);


module.exports = router;