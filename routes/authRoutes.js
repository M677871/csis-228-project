// routes/authRoutes.js
const express = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/login", UserController.showLoginForm);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password").notEmpty().withMessage("Password cannot be blank"),
  ],
  UserController.loginForm
);

router.get("/signup", UserController.showSignupForm);

router.post(
  "/signup",
  [
    //check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    check("userType")
      .isIn(["student", "instructor", "admin"])
      .withMessage("Select a role"),
  ],
  UserController.signupForm
);

module.exports = router;
