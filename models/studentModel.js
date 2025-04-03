/**
 * Represents a Student in the system.
 * 
 * @class
 * @property {number} studentId - The unique identifier for the student.
 * @property {number} userId - The unique identifier for the user associated with the student.
 * @property {string} stuFName - The first name of the student.
 * @property {string} stuLName - The last name of the student.
 * @property {Date} dob - The date of birth of the student.
 * @property {string} profilePicture - The file path or URL of the student's profile picture.
 */



class Student {

    /**
     * Creates an instance of the Student class.
     * 
     * @param {number} studentId - The unique identifier for the student.
     * @param {number} userId - The unique identifier for the user associated with the student.
     * @param {string} stuFName - The first name of the student.
     * @param {string} stuLName - The last name of the student.
     * @param {Date} dob - The date of birth of the student.
     * @param {string} profilePicture - The file path or URL of the student's profile picture.
     */



    constructor(studentId, userId, stuFName, stuLName ,dob,profilePicture) {
        this.studentId = studentId;
        this.userId = userId;   
        this.stuFName = stuFName;
        this.stuLName = stuLName;
        this.dob = dob;
        this.profilePicture = profilePicture;
    }

     /**
     * Creates a Student instance from a database row.
     * 
     * @param {Object} row - The database row containing student data.
     * @param {number} row.student_id - The unique identifier for the student.
     * @param {number} row.user_id - The unique identifier for the user associated with the student.
     * @param {string} row.stu_FName - The first name of the student.
     * @param {string} row.stu_LName - The last name of the student.
     * @param {Date} row.dob - The date of birth of the student.
     * @param {string} row.profile_picture - The file path or URL of the student's profile picture.
     * @returns {Student} - A new Student instance created from the provided row data.
     */
        
    static fromRow(row) {
        return new Student(
            row.student_id,
            row.user_id,
            row.stu_FName,
            row.stu_LName,
            row.dob,
            row.profile_picture
        );
    }
   
}

module.exports = Student;