const moment =require ('moment');

/**
 * Represents a User in the system.
 * 
 * @class
 * @property {number} userId - The unique identifier for the user.
 * @property {string} email - The email address of the user.
 * @property {string} passwordHash - The hashed password of the user.
 * @property {string} userType - The type of the user (e.g., admin, student,instructor).
 * @property {Date} createdAt - The date and time when the user was created.
 */


class User {

 /**
     * Creates an instance of the User class.
     * 
     * @param {number} userId - The unique identifier for the user.
     * @param {string} email - The email address of the user.
     * @param {string} passwordHash - The hashed password of the user.
     * @param {string} userType - The type of the user (e.g., admin, regular).
     * @param {Date} createdAt - The date and time when the user was created.
     */


    constructor(userId,email,passwordHash,userType,createdAt){
        this.userId = userId;
        this.email = email; 
        this.passwordHash = passwordHash;
        this.userType = userType;
        this.createdAt = createdAt;
    }

    /**
     * Creates a User instance from a database row.
     * 
     * @param {Object} row - The database row containing user data.
     * @param {number} row.user_id - The unique identifier for the user.
     * @param {string} row.email - The email address of the user.
     * @param {string} row.password_hash - The hashed password of the user.
     * @param {string} row.user_type - The type of the user (e.g., admin, regular).
     * @param {Date} row.create_at - The creation date and time of the user.
     * @returns {User} - A new User instance created from the provided row data.
     */


        static fromRow(row){
            return new User(
                row.user_id,
                row.email,
                row.password_hash,
                row.user_type,
                moment(row.create_at).format("YYYY-MMM-DD HH:mm:ss")
            );
        }
}
module.exports = User;