/**
 * Represents an answer to a quiz question.
 * 
 * @class
 * @property {number} answerId - The unique identifier for the quiz answer.
 * @property {number} questionId - The unique identifier for the question that this answer belongs to.
 * @property {string} answerText - The text content of the quiz answer.
 * @property {string} answerType - The type of the answer (e.g., multiple-choice, true/false).
 * @property {boolean} isCorrect - A flag indicating whether the answer is correct or not.
 */


class QuizAnswer {

  /**
   * Creates an instance of the QuizAnswer class.
   * 
   * @param {number} answerId - The unique identifier for the quiz answer.
   * @param {number} questionId - The unique identifier for the question that this answer belongs to.
   * @param {string} answerText - The text content of the quiz answer.
   * @param {string} answerType - The type of the answer (e.g., multiple-choice, true/false).
   * @param {boolean} isCorrect - A flag indicating whether the answer is correct or not.
   */


    constructor( answerId,questionId, answerText,answerType, isCorrect) {
        this.answerId = answerId;
        this.questionId = questionId;
        this.answerText = answerText;
        this.answerType = answerType;
        this.isCorrect = isCorrect;
    }

   /**
   * Creates a QuizAnswer instance from a database row.
   * 
   * @param {Object} row - The database row containing quiz answer data.
   * @param {number} row.answer_id - The unique identifier for the quiz answer.
   * @param {number} row.question_id - The unique identifier for the question that this answer belongs to.
   * @param {string} row.answer_text - The text content of the quiz answer.
   * @param {string} row.answer_type - The type of the answer (e.g., multiple-choice, true/false).
   * @param {boolean} row.is_correct - A flag indicating whether the answer is correct or not.
   * @returns {QuizAnswer} - A new QuizAnswer instance created from the provided row data.
   */


   static fromRow(row) {
        return new QuizAnswer(
            row.answer_id,
            row.question_id,
            row.answer_text,
            row.answer_type,
            row.is_correct
        );
    }
}
module.exports = QuizAnswer;