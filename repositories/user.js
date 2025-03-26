const User = require('../models/user');
const bcrypt = require('bcrypt');
const moment = require('moment');

class UserRepository {
    static async createUser(user){
        try {
            const passwordHash = await bcrypt.hash(user.password, 10);
            const addedUser = await User.create({
                email: user.email,
                password_hash:passwordHash,
                user_type:user.userType,
                created_at:moment().format('YYYY-MM-DD HH:mm:ss')
              
            }

            );
            return addedUser;
        }catch(e){
                throw new Error(e);
            }
        }
    
    static async updateUser(user){
        try {
            const passwordHash = await bcrypt.hash(user.password, 10);
            const [updated] = await User.update({
                email: user.email,
                password_hash:passwordHash,
                user_type:user.userType,
                created_at:moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                where: {user_id: user.id}
            }
            )
        }catch(e){
            throw new Error(e);
        }
    }
    static async readUsers(){
        try {
            return await User.findAll();
        }catch(e){
            throw new Error(e);
        }
    }
    static async readUser(id){
        try {
            return await User.findByPk(id);
        }catch(e){
            throw new Error(e);
        }
    }
    static async deleteUser(id){
        try {
            return await User.destroy({where: {user_id: id}});
        }catch(e){
            throw new Error(e);
        }
    }
    static async isEmailExist(email){
        try {
            const user = await User.findOne({where: {email: email}});
            return user ? true : false;
        }catch(e){
            throw new Error(e);
        }
    }
    static async userExistsById(userId){
        try {
            const user = await User.findByPk(userId);
            return user ? true : false;
        }catch(e){
            throw new Error(e);
        }
    }
    static async getUserByEmail(email){
        try {
            return await User.findOne({where: {email: email}});
        }
        catch(e){
            throw new Error(e);
        }
    }
   
    static async changeUserPassword(email, newPassword){
        try {
            const passwordHash = await bcrypt.hash(newPassword, 10);
            const [updated] = await User.update({
                password_hash:passwordHash,
                created_at:moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
                where: {email: email}
            }
            )
        }catch(e){
            throw new Error(e);
        }
    }
    static async getUsersByType(userType){
        try {
            return await User.findAll({where: {user_type: userType}});
        }catch(e){
            throw new Error(e);
        }
    }
}
module.exports = UserRepository;