const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const moment = require("moment");

const userServices = require("../services/userService");

/**
 * @class UserController
 * @description The UserController class handles user-related operations such
 * as user creation, updating, deletion, login, password change, and retrieval.
 */

class UserController {
  /**
   * @async
   * @description Creates a new user in the system with the provided data (email, password, userType).
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message and the created user object.
   */

  static async createUser(req, res) {
    try {
      const { email, password, userType } = req.body;

      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      //const hashedPassword = await bcrypt.hash(password, 10);

      let user = new User(null, email, password, userType, currentDate);

      const result = await userServices.createUser(user);
      res
        .status(201)
        .json({ message: `user created successuflly`, result: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Updates an existing user's information by their ID.
   * @param {Object} req - The request object containing the user ID and data.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message and the updated user object.
   */

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password, userType } = req.body;

      const currentDate = moment().format("YYYY-MM-DD");
      //const hashedPassword = await bcrypt.hash(password, 10);
      let user = new User(id, email, password, userType, currentDate);
      const results = await userServices.updateUser(user);
      return res
        .status(200)
        .json({ message: `user updated successufly`, result: results });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Allows a user to change their password.
   * @param {Object} req - The request object containing the user's email and passwords.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message and result of password change.
   */

  static async changePassword(req, res) {
    try {
      const { email, currentPassword, newPassword } = req.body;

      const user = await userServices.getUserByEmail(email);
      /*if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }*/
      const result = await userServices.changePassword(
        email,
        currentPassword,
        newPassword
      );
      return res
        .status(200)
        .json({ message: `password changed successufly`, result: result });
    } catch (error) {
      console.error("Error changing user password: " + error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Logs a user in by validating their email and password.
   * @param {Object} req - The request object containing the user's email and password.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the user's data and a JWT token if successful.
   */

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userServices.login(email, password);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a user by their email address.
   * @param {Object} req - The request object containing the user's email.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the user's data.
   */

  static async getUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await userServices.getUserByEmail(email);

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a list of all users.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a list of all users.
   */

  static async getUsers(req, res) {
    try {
      const users = await userServices.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a user by their unique ID.
   * @param {Object} req - The request object containing the user ID.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the user data.
   */

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userServices.getUserById(id);
      /*
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }*/
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Deletes a user by their unique ID.
   * @param {Object} req - The request object containing the user ID.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message.
   */

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userServices.deleteUser(id);
      /*
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }*/
      return res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
static async loadUsersForm(req , res){
  res.render("users.ejs", { error: null });
}


  static async loadUsersViewww(req, res) {
    try {
      const users = await userServices.getAllUsers();
      res.render('users', {users: users, message: "User Management" });
        
     
    } catch (error) {
      console.error("Error loading users view:", error);
      res.render("users.ejs", {
        errorMessage: "Failed to load users. Please try again later.",
        users: [],
      });
    }
  }

 static showLoginForm(req, res) {
    console.log('[UserController.showLoginForm] Displaying login form.');
    res.render("login.ejs", {
      error: req.flash('error'),
      email: req.flash('email'),
      validationErrors: req.flash('validationErrors')
    });
  }

  static async loginForm(req, res) {
    const errors = validationResult(req);
    const { email, password } = req.body;

    console.log(`[UserController.loginForm] Attempting login for: ${email}`);

    if (!errors.isEmpty()) {
      console.log('[UserController.loginForm] Validation errors:', errors.array());
      req.flash('validationErrors', errors.array());
      req.flash('email', email);
      return res.redirect('/login');
    }

    try {
      const user = await userServices.login(email, password);

      if (user) {
        req.session.user = user; // Store the entire user object in the session
        console.log(`[UserController.loginForm] User ${user.email} (${user.userType}) authenticated. Session set.`);

        // Redirect based on userType to the specific dashboard routes
        if (user.userType === "instructor") {
          console.log('[UserController.loginForm] Redirecting to /instructor/dashboard');
          return res.redirect("/instructor/dashboard");
        } else if (user.userType === "student") {
          console.log('[UserController.loginForm] Redirecting to /student/dashboard');
          return res.redirect("/student/dashboard");
        } else if (user.userType === "admin") {
          console.log('[UserController.loginForm] Redirecting to /admin/dashboard');
          return res.redirect("/admin/dashboard");
        } else {
          // Fallback for unknown user types
          console.log('[UserController.loginForm] Unrecognized user type, redirecting to /');
          req.flash('error', 'Login successful, but your user type is unrecognized. Redirecting to home.');
          return res.redirect("/");
        }
      } else {
        console.log('[UserController.loginForm] Authentication failed: Incorrect email or password.');
        req.flash('error', 'Incorrect email or password.');
        req.flash('email', email);
        return res.redirect("/login");
      }
    } catch (error) {
      console.error("[UserController.loginForm] Error during login process:", error);
      req.flash('error', 'An unexpected error occurred during login. Please try again.');
      req.flash('email', email);
      return res.redirect("/login");
    }
  }

  /**
   * @description Renders the signup form.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static showSignupForm(req, res) {
    res.render("signup.ejs", {
      error: req.flash('error'),
      success: req.flash('success'),
      validationErrors: req.flash('validationErrors'),
      // Pass old input values to re-populate form on error
      oldInput: {
        email: req.flash('oldEmail'),
        userType: req.flash('oldUserType')
      }
    });
  }

  /**
   * @async
   * @description Handles user signup form submission.
   * @param {Object} req - The request object containing user details.
   * @param {Object} res - The response object.
   */
  static async signupForm(req, res) {
    const errors = validationResult(req);
    const { email, password, userType } = req.body;

    if (!errors.isEmpty()) {
      // If there are validation errors, store them in flash and redirect back to signup
      req.flash('validationErrors', errors.array());
      req.flash('oldEmail', email);
      req.flash('oldUserType', userType);
      return res.redirect('/signup');
    }

    try {
      // IMPORTANT: Ensure password is HASHED before saving to the database.
      // Your userServices.createUser should handle this, or you can do it here.
      // Example: const hashedPassword = await bcrypt.hash(password, 10);
      // let user = new User(null, email, hashedPassword, userType, currentDate);
      // Make sure your userModel and userService are prepared for hashed passwords.

      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      let user = new User(null, email, password, userType, currentDate); // Assuming password will be hashed in userService.createUser

      const results = await userServices.createUser(user); // Assuming this returns true/false or the user object

      if (results) {
        req.flash('success', 'Account created successfully! Please log in.');
        return res.redirect("/login");
      } else {
        req.flash('error', 'Registration failed. Please try again.');
        req.flash('oldEmail', email);
        req.flash('oldUserType', userType);
        return res.redirect("/signup");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      req.flash('error', 'Registration failed. An account with this email might already exist or an unexpected error occurred.');
      req.flash('oldEmail', email);
      req.flash('oldUserType', userType);
      return res.redirect("/signup");
    }
  }

  /**
   * @description Logs out the current user by destroying the session.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Could not log out.");
      }
      res.clearCookie('connect.sid'); // Clear the session cookie (default name)
      res.redirect('/'); // Redirect to home page after logout
    });
  }


  static showchangepasswordForm(req, res) {
    res.render("changePassword.ejs", { error: null });
  }

  static async changePasswordForm(req, res) {
    try {
      const { email, currentPassword, newPassword } = req.body;

      const user = await userServices.getUserByEmail(email);

      const result = await userServices.changePassword(
        email,
        currentPassword,
        newPassword
      );
      if (result) {
        return res.redirect("/login");
      } else {
        return res.render("changePassword.ejs", {
          error: "Incorrect email or password.",
        });
      }
    } catch (error) {
      console.error("Error during changing password:", error);
      return res.render("changePassword.ejs", {
        error: "changing password failed. Please try again.",
      });
    }
  }

  static async loadUserForm(req, res) {
    try {
      const { id } = req.params;
      const user = await userServices.getUserById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render("editUsers.ejs", { user, errorMessage: null });
    } catch (error) {
      console.error("Error in loadUserForm:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password, userType } = req.body;
      const currentDate = moment().format("YYYY-MM-DD");

      let user = new User(id, email, password, userType, currentDate);
      const results = await userServices.updateUser(user);
      if (results) {
        return res.redirect("/users");
      } else {
        return res.status(500).json({ message: "Failed to update user" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteUserr(req, res) {
    const { id } = req.params;
    try {
      const result = await userServices.deleteUser(id);
      if (result) {
        return res.redirect("/users");
      } else {
        return res.status(500).json({ message: "Failed to delete user" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async loadUserView(req, res) {
    try {
      const { id } = req.params;
      const user = await userServices.getUserById(id);
      res.render("userView", { user: user });
    } catch (error) {
      console.error("Error loading user view:", error);
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = UserController;
