const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');

const userServices = require('../services/userService');

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
             const { email, password ,userType  } = req.body;
    
            const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            //const hashedPassword = await bcrypt.hash(password, 10);
            
           let user = new User(null, email, password, userType,currentDate);
          
            const result = await userServices.createUser(user);
             res.status(201).json({message:`user created successuflly`,result:result});    
        }
        catch (error) {
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
            
            const currentDate = moment().format('YYYY-MM-DD');
            //const hashedPassword = await bcrypt.hash(password, 10);
            let user = new User(id, email, password, userType,currentDate);
            const results = await userServices.updateUser(user);
      return res.status(200).json({message:`user updated successufly`,result:results});
        }
        catch (error) {
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
          
            const {email, currentPassword, newPassword } = req.body;
           
     
            const user = await userServices.getUserByEmail(email);
            /*if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }*/
          const result = await userServices.changePassword(email, currentPassword, newPassword);
            return res.status(200).json({message:`password changed successufly`,result:result});
        }catch (error) {
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
            const { email } = req.body;
            const user = await userServices.getUserByEmail(email);
            
            return res.status(200).json(user);
        }
        catch (error) {
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
        }
        catch (error) {
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
        }
        catch (error) {
           
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
            return res.status(200).json({ message: 'user deleted successfully' });
      
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
}
module.exports = UserController;