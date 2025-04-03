/**
 * Represents a course in the system.
 * 
 * @class
 * @property {number} courseId - The unique identifier for the course.
 * @property {number} instructorId - The unique identifier for the instructor of the course.
 * @property {number} categorieId - The unique identifier for the category the course belongs to.
 * @property {string} courseName - The name of the course.
 * @property {string} description - A brief description of the course.
 * @property {Date} createAt - The date when the course was created.
 */

class Course {

   /**
   * Creates an instance of the Course class.
   * 
   * @param {number} courseId - The unique identifier for the course.
   * @param {number} instructorId - The unique identifier for the instructor of the course.
   * @param {number} categorieId - The unique identifier for the category the course belongs to.
   * @param {string} courseName - The name of the course.
   * @param {string} description - A brief description of the course.
   * @param {Date} createAt - The date when the course was created.
   */


    constructor(courseId, instructorId, categorieId ,courseName, description, createAt) {
        this.courseId = courseId;
        this.instructorId = instructorId;
        this.categorieId = categorieId;
        this.courseName = courseName;
        this.description = description;
        this.createAt = createAt;
        
        
    }

   /**
   * Creates a Course instance from a database row.
   * 
   * @param {Object} row - The database row containing course data.
   * @param {number} row.course_id - The unique identifier for the course.
   * @param {number} row.instructor_id - The unique identifier for the instructor of the course.
   * @param {number} row.categorie_id - The unique identifier for the category the course belongs to.
   * @param {string} row.course_name - The name of the course.
   * @param {string} row.description - A brief description of the course.
   * @param {string} row.create_at - The date when the course was created (ISO string format).
   * @returns {Course} - A new Course instance created from the provided row data.
   */



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
