/**
 * Represents a course material associated with a specific course.
 * 
 * @class
 * @property {number} materialId - The unique identifier for the course material.
 * @property {number} courseId - The unique identifier for the course the material belongs to.
 * @property {string} title - The title of the course material.
 * @property {string} materialType - The type of the material (e.g., 'video', 'pdf', 'image').
 * @property {string} filePath - The file path where the material is stored.
 * @property {Date} createAt - The date and time when the material was created.
 */

class CourseMaterial {

   /**
   * Creates an instance of the CourseMaterial class.
   * 
   * @param {number} materialId - The unique identifier for the course material.
   * @param {number} courseId - The unique identifier for the course the material belongs to.
   * @param {string} title - The title of the course material.
   * @param {string} materialType - The type of the material (e.g., 'video', 'pdf', 'image').
   * @param {string} filePath - The file path where the material is stored.
   * @param {Date} createAt - The date and time when the material was created.
   */

    constructor(materialId, courseId, title, materialType, filePath,createAt) {
        this.materialId = materialId;
        this.courseId = courseId;
        this.title = title;
        this.materialType = materialType;
        this.filePath = filePath;
        this.createAt = createAt;
    }

   /**
   * Creates a CourseMaterial instance from a database row.
   * 
   * @param {Object} row - The database row containing course material data.
   * @param {number} row.material_id - The unique identifier for the course material.
   * @param {number} row.course_id - The unique identifier for the course the material belongs to.
   * @param {string} row.title - The title of the course material.
   * @param {string} row.material_type - The type of the material (e.g., 'video', 'pdf', 'image').
   * @param {string} row.file_path - The file path where the material is stored.
   * @param {string} row.create_at - The date and time when the material was created (ISO string format).
   * @returns {CourseMaterial} - A new CourseMaterial instance created from the provided row data.
   */


    static fromRow(row) {
        return new CourseMaterial(
            row.material_id,
            row.course_id,
            row.title,
            row.material_type,
            row.file_path,
            row.create_at
        );
       
    }
}

module.exports = CourseMaterial;