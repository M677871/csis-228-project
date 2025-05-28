// routes/authRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator"); // Import validationResult
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/login", UserController.showLoginForm);

router.post(
  "/login",
  [
    check("email")
      .isEmail().withMessage("Please enter a valid email address.")
      .normalizeEmail(), // Optional: sanitize email
    check("password")
      .notEmpty().withMessage("Password cannot be blank.")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
  ],
  UserController.loginForm
);

router.get("/signup", UserController.showSignupForm);

router.post(
  "/signup",
  [
    check("email")
      .isEmail().withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    check("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    // You might want to add a confirm password field and validation here
    check("userType")
      .isIn(["student", "instructor", "admin"]).withMessage("Please select a valid role (Student, Instructor, or Admin)."),
  ],
  UserController.signupForm
);

// Add a logout route
router.get("/logout", UserController.logout); // Use GET for simplicity, but POST is more secure for logout

module.exports = router;
