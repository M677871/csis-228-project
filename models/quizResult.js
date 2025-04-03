/**
 * Represents a QuizResult in the system.
 * 
 * @class
 * @property {number} resultId - The unique identifier for the quiz result.
 * @property {number} quizId - The unique identifier for the quiz associated with the result.
 * @property {number} studentId - The unique identifier for the student who took the quiz.
 * @property {number} score - The score achieved by the student in the quiz.
 * @property {Date} completedAt - The date and time when the quiz was completed.
 */


class QuizResult {

    /**
   * Creates an instance of the QuizResult class.
   * 
   * @param {number} resultId - The unique identifier for the quiz result.
   * @param {number} quizId - The unique identifier for the quiz associated with the result.
   * @param {number} studentId - The unique identifier for the student who took the quiz.
   * @param {number} score - The score achieved by the student in the quiz.
   * @param {Date} completedAt - The date and time when the quiz was completed.
   */


  constructor(resultId, quizId, studentId, score, completedAt) {
    this.resultId = resultId;
    this.quizId = quizId;
    this.studentId = studentId;
    this.score = score;
    this.completedAt = completedAt;
  }

  /**
   * Creates a QuizResult instance from a database row.
   * 
   * @param {Object} row - The database row containing quiz result data.
   * @param {number} row.result_id - The unique identifier for the quiz result.
   * @param {number} row.quiz_id - The unique identifier for the quiz associated with the result.
   * @param {number} row.student_id - The unique identifier for the student who took the quiz.
   * @param {number} row.score - The score achieved by the student in the quiz.
   * @param {Date} row.completed_at - The date and time when the quiz was completed.
   * @returns {QuizResult} - A new QuizResult instance created from the provided row data.
   */

    static fromRow(row) {
        return new QuizResult(
        row.result_id,
        row.quiz_id,
        row.student_id,
        row.score,
        row.completed_at
        );
    }
}
module.exports = QuizResult;    