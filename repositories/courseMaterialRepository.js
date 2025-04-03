const db = require("../config/db");
const CourseMaterial = require("../models/courseMaterialModel");
const moment = require("moment");


/**
 * The `CourseMaterialRepository` class provides a set of static
 *  methods to interact with the `course_materials` table in the database.
 * It includes operations such as creating, updating, deleting, 
 * retrieving, and checking for course materials associated with courses.
 * 
 * @class
 */

class CourseMaterialRepository {

  /**
   * createCourseMaterial: Creates a new course material in the database.
   * @param {Object} courseMaterial - The course material details.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async createCourseMaterial(courseMaterial) {
    try {
      const query = `INSERT INTO course_materials (course_id, title, material_type,file_path,created_at) VALUES (?,?,?,? ,?)`;
      const { affectedRows } = await db.query(query, [
        courseMaterial.courseId,
        courseMaterial.title,
        courseMaterial.materialType,
        courseMaterial.filePath,
        courseMaterial.createAt
      ]);
      return affectedRows;
    } catch (error) {
      throw new Error("Error creating course material: " + error.message);
    }
  }

  /**
   * updateCourseMaterial: Updates the details of an existing course material.
   * @param {Object} courseMaterial - The updated course material details.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the database query fails.
   */

  static async updateCourseMaterial(courseMaterial) {
    try {
      const query = `UPDATE course_materials 
      SET course_id=?, title=?, material_type=?, file_path=?, created_at=? 
      WHERE material_id=?`;
      const { affectedRows } = await db.query(query, [
        courseMaterial.courseId,
        courseMaterial.title,
        courseMaterial.materialType,
        courseMaterial.filePath,
        courseMaterial.createAt,
        courseMaterial.materialId
      ]);
        return affectedRows;
    }
    catch (error) {
      console.log(error);
      throw new Error("Error updating course material: " + error.message);
    }
}

  /**
   * deleteCourseMaterialByCourseId: Deletes all course materials associated with a given course.
   * @param {number} courseId - The ID of the course.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the database query fails.
   */

static async deleteCourseMaterialByCoureId(courseId) {
    try {
        const query = `DELETE FROM course_materials WHERE course_id = ?`;
        const { affectedRows } = await db.query(query, [courseId]);
        return affectedRows;
    } catch (error) {
        throw new Error("Error deleting course material: " + error.message);
    }
}

  /**
   * deleteCourseMaterial: Deletes a specific course material by its ID.
   * @param {number} materialId - The ID of the course material to delete.
   * @returns {number} - The number of affected rows.
   * @throws {Error} - Throws an error if the database query fails.
   */

static async deleteCourseMaterial(materialId) {
    try {
        const query = `DELETE FROM course_materials WHERE material_id = ?`;
        const { affectedRows } = await db.query(query, [materialId]);
        return affectedRows;
    } catch (error) {
        throw new Error("Error deleting course material: " + error.message);
    }   
}

  /**
   * getCourseMaterialByCourseId: Retrieves all materials associated with a specific course.
   * @param {number} courseId - The ID of the course.
   * @returns {Array} - An array of CourseMaterial objects.
   * @throws {Error} - Throws an error if the database query fails.
   */

static async getCourseMaterialByCourseId(courseId) {

    try {
        const query = "SELECT * FROM course_materials WHERE course_id = ?";
        const rows = await db.query(query, [courseId]);
        return rows.map(CourseMaterial.fromRow);
    } catch (error) {
        throw new Error("Error fetching course materials by course ID: " + error.message);
    }
}

  /**
   * getCourseMaterialById: Retrieves a course material by its ID.
   * @param {number} materialId - The ID of the course material.
   * @returns {CourseMaterial} - A CourseMaterial object.
   * @throws {Error} - Throws an error if the database query fails.
   */

    static async getCourseMaterialById(materialId) {
        try {
        const query = "SELECT * FROM course_materials WHERE material_id = ?";
        const rows = await db.query(query, [materialId]);
        return CourseMaterial.fromRow(rows[0]);
        } catch (error) {
        throw new Error("Error fetching course material: " + error.message);
        }
    }

  /**
   * getAllCourseMaterials: Retrieves all course materials from the database.
   * @returns {Array} - An array of CourseMaterial objects.
   * @throws {Error} - Throws an error if the database query fails.
   */

    static async getAllCourseMaterials() {
        try {
        const query = "SELECT * FROM course_materials";
        const rows = await db.query(query);
        return rows.map(CourseMaterial.fromRow);
        } catch (error) {
        throw new Error("Error fetching all course materials: " + error.message);
        }
    }

  /**
   * courseMaterialExists: Checks if a course material exists by its ID.
   * @param {number} materialId - The ID of the course material.
   * @returns {boolean} - Returns true if the course material exists, false otherwise.
   * @throws {Error} - Throws an error if the database query fails.
   */

    static async courseMaterialExists(materialId) {
        try {
        const query = "SELECT * FROM course_materials WHERE material_id = ?";
        const rows = await db.query(query, [materialId]);
        return rows.length > 0 ? true : false;
        } catch (error) {
        throw new Error("Error fetching course material: " + error.message);
        }
    }

  /**
   * courseMaterialExistsByCourseId: Checks if there are any materials associated with a course by course ID.
   * @param {number} courseId - The ID of the course.
   * @returns {boolean} - Returns true if materials exist for the course, false otherwise.
   * @throws {Error} - Throws an error if the database query fails.
   */

    static async courseMaterialExistsByCourseId(courseId) {
        try {
        const query = "SELECT * FROM course_materials WHERE course_id = ?";
        const rows = await db.query(query, [courseId]);
        return rows.length > 0 ? true : false;
        } catch (error) {
        throw new Error("Error fetching course material: " + error.message);
        }
    }
}
module.exports = CourseMaterialRepository;