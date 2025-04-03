/**
 * Represents an enrollment of a student in a course.
 * 
 * @class
 * @property {number} enrollementId - The unique identifier for the enrollment record.
 * @property {number} studentId - The unique identifier for the student who is enrolled.
 * @property {number} courseId - The unique identifier for the course in which the student is enrolled.
 * @property {string} status - The current status of the enrollment (e.g., 'active', 'completed', 'dropped').
 * @property {Date} enrolledAt - The date and time when the student enrolled in the course.
 */


class Enrollement {

   /**
   * Creates an instance of the Enrollement class.
   * 
   * @param {number} enrollementId - The unique identifier for the enrollment record.
   * @param {number} studentId - The unique identifier for the student who is enrolled.
   * @param {number} courseId - The unique identifier for the course in which the student is enrolled.
   * @param {string} status - The current status of the enrollment (e.g., 'active', 'completed', 'dropped').
   * @param {Date} enrolledAt - The date and time when the student enrolled in the course.
   */


    constructor(enrollementId,studentId, courseId,status,enrolledAt) {
        this.enrollementId = enrollementId;
        this.studentId = studentId;
        this.courseId = courseId;
        this.status = status;
        this.enrolledAt = enrolledAt;

    }

    /**
   * Creates an Enrollement instance from a database row.
   * 
   * @param {Object} row - The database row containing enrollment data.
   * @param {number} row.enrollement_id - The unique identifier for the enrollment record.
   * @param {number} row.student_id - The unique identifier for the student who is enrolled.
   * @param {number} row.course_id - The unique identifier for the course in which the student is enrolled.
   * @param {string} row.status - The current status of the enrollment.
   * @param {string} row.enrolled_at - The date and time when the student enrolled (ISO string format).
   * @returns {Enrollement} - A new Enrollement instance created from the provided row data.
   */


    static fromRow(row) {
        return new Enrollement(
            row.enrollement_id,
            row.student_id,
            row.course_id,
            row.status,
            row.enrolled_at
        );
    }
}
module.exports = Enrollement;