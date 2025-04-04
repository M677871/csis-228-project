const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const authToken = require('../utils/authToken');
require('dotenv').config();

/**
 * The `UserService` class provides methods to manage users, including fetching user details, creating users, 
 * updating user information, logging in, changing passwords, and deleting users.
 * 
 * @class
 */

class UserService {

  /**
   * Retrieves all users from the database.
   * 
   * @returns {User[]} - A promise that resolves to an array of user objects.
   * @throws {Error} - Throws an error if the operation fails.
   */

  static async getAllUsers() {
    try {
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  /**
   * Retrieves a user by their ID.
   * 
   * @param {number} id - The ID of the user to retrieve.
   * @returns {User} - A promise that resolves to the user object.
   * @throws {Error} - Throws an error if the user does not exist or the operation fails.
   */

  static async getUserById(id) {
    try {
     if (!(await userRepository.userExistsById(id))) {
        throw new Error(`User ID: ${id} does not exist`);
      }
      const user = await userRepository.getUserById(id);
     
      return user;
    } catch (error) {
      
      throw new Error("Error fetching user: " + error.message);
    }
  }

/**
 * Retrieves a user by their email address.
 * 
 * @param {string} email - The email address of the user to retrieve.
 * @returns {User} - A promise that resolves to the user object.
 * @throws {Error} - Throws an error if the user does not exist or the operation fails.
 * */
 

  static async getUserByEmail(email) {
    try {
      
      if (!(await userRepository.isEmailExist(email))) {
        throw new Error(`User email: ${email} does not exist`);
      }
      const user = await userRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      console.error("Error fetching user by email: " + error.message);
      throw new Error("Error fetching user by email: " + error.message);
    }
  }
  static async getUsersByType(userType) {
    try {
      const users = await userRepository.getUsersByType(userType);
      return users;
    } catch (error) {
      throw new Error("Error fetching users by type: " + error.message);
    }
  }


  /**
   * Creates a new user in the database.
   * 
   * @param {Object} user - The user data to create.
   * @returns {User} - A promise that resolves to the created user object.
   * @throws {Error} - Throws an error if the user already exists or the operation fails.
   */

  static async createUser(user) {
    try {
      
      if (await userRepository.isEmailExist(user.email)) {
        throw new Error(`Email: ${user.email} already exists`);
      }
      const newUser = await userRepository.createUser(user);
      return newUser;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  /**
   * Updates an existing user in the database.
   * 
   * @param {Object} userData - The user data to update.
   * @returns {User} - A promise that resolves to the updated user object.
   * @throws {Error} - Throws an error if the user does not exist or the operation fails.
   * */

  static async updateUser( userData) {
    try {
      
      if (!(await userRepository.userExistsById(userData.userId))) {
        throw new Error(`User ID: ${userData.userId} does not exist`);
      }
      let user = await userRepository.getUserById(userData.userId);
      if (user.email !== userData.email && (await userRepository.isEmailExist(userData.email))) {
        throw new Error(`Email: ${userData.email} already exists`);
      }
      
      const updatedUser = await userRepository.updateUser( userData);
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  /**
   * Logs in a user by validating their email and password.
   * 
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Object} - A promise that resolves to an object containing the login status and token.
   * @throws {Error} - Throws an error if the email does not exist or the password is incorrect.
   * */

  static async login(email, password) {
    try{
      if (!(await userRepository.isEmailExist(email))) {
        throw new Error(`User email: ${email} does not exist`);
      }
    const user = await userRepository.getUserByEmail(email);

    

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = authToken.generateToken({
      userId: user.userId,
      email: user.email,
      userType: user.userType,
    });
  
    return {
      message: "Login successful",
      token: token,
      user: { email: user.email, userType: user.userType },
    };
  }catch(error) {
    console.error("Error during login:", error);
    throw new Error("Error during login: " + error.message);
  }

}


  /**
   * Changes the password of a user.
   * 
   * @param {string} email - The email address of the user.
   * @param {string} currentPassword - The current password of the user.
   * @param {string} newPassword - The new password to set.
   * @returns {User} - A promise that resolves to the updated user object.
   * @throws {Error} - Throws an error if the email does not exist or the current password is incorrect.
   */

  static async changePassword(email, currentPassword, newPassword) {
    try {
      
      if (!(await userRepository.isEmailExist(email))) {
        throw new Error(`User email: ${email} does not exist`);
      }
      const user = await userRepository.getUserByEmail(email);
      
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );
      if (!isPasswordMatch) {
        throw new Error("Current password is incorrect");
      }

      const updatedUser = await userRepository.changeUserPassword(
        email,
        newPassword
      );
      return updatedUser;
    } catch (error) {
      //console.error("Error changing user password: " + error.message);
      throw new Error("Error changing password: " + error.message);
    }
  }

/**
   * Deletes a user from the database.
   * 
   * @param {number} id - The ID of the user to delete.
   * @returns {User} - A promise that resolves to the deleted user object.
   * @throws {Error} - Throws an error if the user does not exist or the operation fails.
   */

  static async deleteUser(id) {
    try {
      
      if (!(await userRepository.userExistsById(id))) {
        throw new Error(`User ID: ${id} does not exist`);
      }
      const deletedUser = await userRepository.deleteUser(id);
      return deletedUser;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }


  /**
   * Authenticates a user by validating their email and password.
   * 
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @return {boolean} - A promise that resolves to true if authentication is successful, false otherwise.
   * @throws {Error} - Throws an error if the email does not exist or the password is incorrect.
   */
  
  static async authenticateUser(email, password) {
    try {
      const user = await userRepository.getUserByEmail(email);

      // console.log(user);

      if (!user) {
        console.log(`User with email ${email} not found`);
        return false;
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        console.log("Password is incorrect");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw new Error("Error authenticating user: " + error.message);
    }
  }
}

module.exports = UserService;
