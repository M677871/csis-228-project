/**
 * Represents a Quiz in the system.
 * 
 * @class
 * @property {number} quizId - The unique identifier for the quiz.
 * @property {number} courseId - The unique identifier for the course to which the quiz belongs.
 * @property {string} quizName - The name of the quiz.
 * @property {string} quizDescription - A description of the quiz.
 * @property {Date} createAt - The date and time when the quiz was created.
 */

class Quiz{

   /**
   * Creates an instance of the Quiz class.
   * 
   * @param {number} quizId - The unique identifier for the quiz.
   * @param {number} courseId - The unique identifier for the course to which the quiz belongs.
   * @param {string} quizName - The name of the quiz.
   * @param {string} quizDescription - A description of the quiz.
   * @param {Date} createAt - The date and time when the quiz was created.
   */


    constructor(quizId, courseId, quizName, quizDescription, createAt){
        this.quizId = quizId;
        this.courseId = courseId;
        this.quizName = quizName;
        this.quizDescription = quizDescription;
        this.createAt = createAt;
    }

   /**
   * Creates a Quiz instance from a database row.
   * 
   * @param {Object} row - The database row containing quiz data.
   * @param {number} row.quiz_id - The unique identifier for the quiz.
   * @param {number} row.course_id - The unique identifier for the course to which the quiz belongs.
   * @param {string} row.quiz_name - The name of the quiz.
   * @param {string} row.quiz_description - A description of the quiz.
   * @param {string} row.create_at - The date and time when the quiz was created (ISO string format).
   * @returns {Quiz} - A new Quiz instance created from the provided row data.
   */


    static fromRow(row){
        return new Quiz(
            row.quiz_id,
            row.course_id,
            row.quiz_name,
            row.quiz_description,
            row.create_at
        );
      
    }
}
module.exports = Quiz; 

