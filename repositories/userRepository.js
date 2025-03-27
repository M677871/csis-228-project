const db = require("../config/db");
const bcrypt = require("bcrypt");
const moment = require("moment");
const User = require("../models/userModel");

class UserRepository {
  // Create a new user
  static async createUser(user) {
    try {
      const query = `INSERT INTO users (email, password_hash, user_type, create_at) VALUES (?, ?, ?, ?)`;
      const hashedPassword = await bcrypt.hash(user.passwordHash, 10);
      const { affectedRows } = await db.query(query, [
        user.email,
        hashedPassword,
        user.userType,
        moment().format("YYYY-MM-DD HH:mm:ss")
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  // Get user by ID
  static async getUserById(userId) {
    try {
      const query = "SELECT * FROM users WHERE user_id = ?";
      const rows = await db.query(query, [userId]);
      return User.fromRow(rows[0]);
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  // Get user by email (for login)
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



  static async updateUser(user) {
    try {
      const query = `UPDATE users SET email = ?, password_hash = ?, user_type = ?, create_at = ? WHERE user_id = ?`;
      const hashedPassword = await bcrypt.hash(user.passwordHash, 10);
      const { affectedRows } = await db.query(query, [
        user.email,
        hashedPassword,
        user.userType,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        user.userId
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  // Delete a user
  static async deleteUser(userId) {
    try {
      const query = "DELETE FROM users WHERE user_id = ?";
      const { affectedRows } = await db.query(query, [userId]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  // Check if email exists
  static async isEmailExist(email) {
    try {
      const query = "SELECT * FROM users WHERE email = ?";
      const rows = await db.query(query, [email]);
      return  rows.length > 0 ? true : false;
    } catch (error) {
      throw new Error("Error checking if email exists: " + error.message);
    }
  }

  // Get users by type
  static async getUsersByType(userType) {
    try {
      const query = "SELECT * FROM users WHERE user_type = ?";
      const rows = await db.query(query, [userType]);
      return rows.map(User.fromRow);
    } catch (error) {
      throw new Error("Error fetching users by type: " + error.message);
    }
  }

  // Change user password
  
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

   

  // Get all users
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
