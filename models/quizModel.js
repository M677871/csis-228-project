class Quiz{
    constructor(quizId, courseId, quizName, quizDescription, createAt){
        this.quizId = quizId;
        this.courseId = courseId;
        this.quizName = quizName;
        this.quizDescription = quizDescription;
        this.createAt = createAt;
    }
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

