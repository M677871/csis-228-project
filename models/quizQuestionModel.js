/**
 * Represents a QuizQuestion in the system.
 * 
 * @class
 * @property {number} questionId - The unique identifier for the quiz question.
 * @property {number} quizId - The unique identifier for the quiz that the question belongs to.
 * @property {string} questionText - The text of the quiz question.
 * @property {Date} createdAt - The date and time when the question was created.
 */



class QuizQuestion{

  /**
   * Creates an instance of the QuizQuestion class.
   * 
   * @param {number} questionId - The unique identifier for the quiz question.
   * @param {number} quizId - The unique identifier for the quiz that the question belongs to.
   * @param {string} questionText - The text of the quiz question.
   * @param {Date} createdAt - The date and time when the question was created.
   */

    constructor(questionId, quizId, questionText, createdAt){
        this.questionId = questionId;
        this.quizId = quizId;
        this.questionText = questionText;
        this.createdAt = createdAt;
    }

  /**
   * Creates a QuizQuestion instance from a database row.
   * 
   * @param {Object} row - The database row containing quiz question data.
   * @param {number} row.question_id - The unique identifier for the quiz question.
   * @param {number} row.quiz_id - The unique identifier for the quiz that the question belongs to.
   * @param {string} row.question_text - The text of the quiz question.
   * @param {Date} row.created_at - The date and time when the question was created.
   * @returns {QuizQuestion} - A new QuizQuestion instance created from the provided row data.
   */


    static fromRow(row){
        return new QuizQuestion(
            row.question_id,
            row.quiz_id,
            row.question_text,
            row.created_at
        );
      }
}

module.exports = QuizQuestion;