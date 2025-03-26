class Course {
    constructor(courseId, instructorId, categorieId ,courseName, description, createAt) {
        this.courseId = courseId;
        this.instructorId = instructorId;
        this.categorieId = categorieId;
        this.courseName = courseName;
        this.description = description;
        this.createAt = createAt;
        
        
    }
    static fromRow(row) {
        return new Course(
            row.course_id,
            row.instructor_id,
            row.categorie_id,
            row.course_name,
            row.description,
            row.create_at
            
        );
        
    }
       
}

module.exports = Course;
