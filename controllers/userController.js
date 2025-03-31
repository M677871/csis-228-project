const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const moment = require('moment');

const userServices = require('../services/userService');

class UserController {
    
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

          
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await userServices.login(email, password);
            
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
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
    static async getUsers(req, res) {
        try {
            const users = await userServices.getAllUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
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