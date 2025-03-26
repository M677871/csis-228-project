class Enrollement {
    constructor(enrollementId,studentId, courseId,status,enrolledAt) {
        this.enrollementId = enrollementId;
        this.studentId = studentId;
        this.courseId = courseId;
        this.status = status;
        this.enrolledAt = enrolledAt;

    }
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