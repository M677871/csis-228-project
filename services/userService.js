const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const authToken = require('../utils/authToken');
require('dotenv').config();

class UserService {
    static async getAllUsers() {
        try {
            const users = await userRepository.getAllUsers();
            return users;
        } catch (error) {
            throw new Error("Error fetching users: " + error.message);
        }
    }

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

    static async updateUser(userData) {
        try {
            if (!(await userRepository.userExistsById(userData.userId))) {
                throw new Error(`User ID: ${userData.userId} does not exist`);
            }
            let user = await userRepository.getUserById(userData.userId);
            if (user.email !== userData.email && (await userRepository.isEmailExist(userData.email))) {
                throw new Error(`Email: ${userData.email} already exists`);
            }
            const updatedUser = await userRepository.updateUser(userData);
            return updatedUser;
        } catch (error) {
            throw new Error("Error updating user: " + error.message);
        }
    }

    // --- FIX IS IN THIS METHOD ---
    static async login(email, password) {
        try {
            if (!(await userRepository.isEmailExist(email))) {
                throw new Error(`User email: ${email} does not exist`);
            }
            const user = await userRepository.getUserByEmail(email); // This 'user' is your User object

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            // Remove the 'message' and 'token' from the return for login form handling
            // The controller only needs the user object for session and redirect logic
            // You can generate and send the token in a different way for API responses if needed.
            return user; // <--- Return the User object directly here!
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error("Error during login: " + error.message);
        }
    }

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
            throw new Error("Error changing password: " + error.message);
        }
    }

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

    static async authenticateUser(email, password) {
        try {
            const user = await userRepository.getUserByEmail(email);
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
