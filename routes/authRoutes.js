
const express = require('express');
const userController    = require('../controllers/userController');
const { validateUserLogin, validateUser } = require('../validators/user.dto');

const router = express.Router();

router.get('/login', userController.showLoginForm);

router.post(
  '/login',
  validateUserLogin,
  userController.loginForm
);

router.get('/signup', userController.showSignupForm);

router.post(
  '/signup',
  validateUser,
  userController.signupForm
);

module.exports = router;
