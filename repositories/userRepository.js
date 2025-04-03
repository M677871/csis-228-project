const db = require("../config/db");
const bcrypt = require("bcrypt");
const moment = require("moment");
const User = require("../models/userModel");

class UserRepository {
  
  /**
   * Create a new user.
   * 
   * @param {Object} user - The user data.
   * @returns {number} - The number of affected rows (should be 1 if successful).
   * @throws {Error} - Throws an error if the operation fails.
   */


  static async createUser(user) {
    try {
      const query = `INSERT INTO users (email, password_hash, user_type, create_at) VALUES (?, ?, ?, ?)`;
      const hashedPassword = await bcrypt.hash(user.passwordHash, 10);
      const { affectedRows } = await db.query(query, [
        user.email,
        hashedPassword,
        user.userType,
        user.createdAt
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  /**
   * Get a user by ID.
   * 
   * @param {number} userId - The ID of the user.
   * @returns {User} - The user object.
   * @throws {Error} - Throws an error if the operation fails.
   */
  


  static async getUserById(userId) {
    try {
      const query = "SELECT * FROM users WHERE user_id = ?";
      const rows = await db.query(query, [userId]);
      return User.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  /**
   * Get a user by email.
   * 
   * @param {string} email - The email address of the user.
   * @returns {User} - The user object.
   * @throws {Error} - Throws an error if the operation fails.
   */
  

  static async getUserByEmail(email) {
    try {

      const query = "SELECT * FROM users WHERE email = ?";
      const rows = await db.query(query, [email]); 
      
      return User.fromRow(rows[0]);
    } catch (error) {
      console.error("Error fetching user by email: " + error.message);
      throw new Error("Error fetching user by email: " + error.message);
    }
  }

  /**
   * Update an existing user.
   * 
   * @param {Object} user - The user data.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the operation fails.
   */

  static async updateUser(user) {
    try {
      const query = `UPDATE users SET email = ?, password_hash = ?, user_type = ?, create_at = ? WHERE user_id = ?`;
      const hashedPassword = await bcrypt.hash(user.passwordHash, 10);
      const { affectedRows } = await db.query(query, [
        user.email,
        hashedPassword,
        user.userType,
        user.createdAt,
        user.userId
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  /**
   * Delete a user.
   * 
   * @param {number} userId - The ID of the user to delete.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the operation fails.
   */


  static async deleteUser(userId) {
    try {
      const query = "DELETE FROM users WHERE user_id = ?";
      const { affectedRows } = await db.query(query, [userId]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  /**
   * Check if the provided email exists in the database.
   * 
   * @param {string} email - The email address to check.
   * @returns {boolean} - Returns true if the email exists, false otherwise.
   * @throws {Error} - Throws an error if the operation fails.
   */


  static async isEmailExist(email) {
    try {
      const query = "SELECT * FROM users WHERE email = ?";
      const rows = await db.query(query, [email]);
      return  rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error checking if email exists: " + error.message);
    }
  }

  
  /**
   * Get users filtered by their type (e.g., 'admin', 'user').
   * 
   * @param {string} userType - The type of user to filter by.
   * @returns {User[]} - An array of user objects.
   * @throws {Error} - Throws an error if the operation fails.
   */


  static async getUsersByType(userType) {
    try {
      const query = "SELECT * FROM users WHERE user_type = ?";
      const rows = await db.query(query, [userType]);
      return rows.map(User.fromRow);
    } catch (error) {
      throw new Error("Error fetching users by type: " + error.message);
    }
  }


    /**
   * Change the password of a user.
   * 
   * @param {string} email - The email of the user.
   * @param {string} newPassword - The new password for the user.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the operation fails.
   */
  
  static async changeUserPassword(email, newPassword) {
    try {
     
      const query = `UPDATE users SET password_hash = ?, create_at = ? WHERE email = ?`;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const { affectedRows } = await db.query(query, [
        hashedPassword,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        email
      ]);
      return affectedRows ;
    } catch (error) {
      console.error("Error changing user password: " + error.message);
      throw new Error("Error changing user password: " + error.message);
    }
  }

   
  /**
   * Get all users from the database.
   * 
   * @returns {User[]} - An array of all user objects.
   * @throws {Error} - Throws an error if the operation fails.
   */
  

  static async getAllUsers() {
    try {
      const query = "SELECT * FROM users";
      const rows = await db.query(query);
      //console.log(rows);
      return rows.map(User.fromRow);
    } catch (error) {
      throw new Error("Error fetching all users: " + error.message);
    }
  }

  /**
   * Check if a user exists by their user ID.
   * 
   * @param {number} userId - The user ID to check.
   * @returns {boolean} - Returns true if the user exists, false otherwise.
   * @throws {Error} - Throws an error if the operation fails.
   */

  static async userExistsById(userId) {
    try {
      
      const sql = `SELECT * FROM users WHERE user_id = ?`;
      const rows = await db.query(sql, [userId]);
     
      return rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error checking if user exists by ID: " + error.message);
    }
  } 
 
}

module.exports = UserRepository;
