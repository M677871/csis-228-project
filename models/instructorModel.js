/**
 * Represents an Instructor in the system.
 * 
 * @class
 * @property {number} instructorId - The unique identifier for the instructor.
 * @property {number} userId - The unique identifier for the user associated with the instructor.
 * @property {string} insFName - The first name of the instructor.
 * @property {string} insLName - The last name of the instructor.
 * @property {string} bio - A short biography of the instructor.
 * @property {string} profilePicture - The URL or path to the instructor's profile picture.
 */


class Instructor{

  /**
   * Creates an instance of the Instructor class.
   * 
   * @param {number} instructorId - The unique identifier for the instructor.
   * @param {number} userId - The unique identifier for the user associated with the instructor.
   * @param {string} insFName - The first name of the instructor.
   * @param {string} insLName - The last name of the instructor.
   * @param {string} bio - A short biography of the instructor.
   * @param {string} profilePicture - The URL or path to the instructor's profile picture.
   */

    constructor(instructorId, userId, insFName, insLName , bio, profilePicture) {
        this.instructorId = instructorId;
        this.userId = userId;   
        this.insFName = insFName;
        this.insLName = insLName;   
        this.bio = bio;
        this.profilePicture = profilePicture;
    }

  /**
   * Creates an Instructor instance from a database row.
   * 
   * @param {Object} row - The database row containing instructor data.
   * @param {number} row.instructor_id - The unique identifier for the instructor.
   * @param {number} row.user_id - The unique identifier for the user associated with the instructor.
   * @param {string} row.ins_FName - The first name of the instructor.
   * @param {string} row.ins_LName - The last name of the instructor.
   * @param {string} row.bio - A short biography of the instructor.
   * @param {string} row.profile_picture - The URL or path to the instructor's profile picture.
   * @returns {Instructor} - A new Instructor instance created from the provided row data.
   */

    static fromRow(row) {
        return new Instructor(
            row.instructor_id,
            row.user_id,
            row.ins_FName,
            row.ins_LName,
            row.bio,
            row.profile_picture
        );
        
    }
}
module.exports = Instructor;

