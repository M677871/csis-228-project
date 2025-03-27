const db = require("../config/db");
const CourseMaterial = require("../models/courseMaterialModel");
const moment = require("moment");

class CourseMaterialRepository {
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
static async deleteCourseMaterialByCoureId(courseId) {
    try {
        const query = `DELETE FROM course_materials WHERE course_id = ?`;
        const { affectedRows } = await db.query(query, [courseId]);
        return affectedRows;
    } catch (error) {
        throw new Error("Error deleting course material: " + error.message);
    }
}
static async deleteCourseMaterial(materialId) {
    try {
        const query = `DELETE FROM course_materials WHERE material_id = ?`;
        const { affectedRows } = await db.query(query, [materialId]);
        return affectedRows;
    } catch (error) {
        throw new Error("Error deleting course material: " + error.message);
    }   
}
static async getCourseMaterialByCourseId(courseId) {

    try {
        const query = "SELECT * FROM course_materials WHERE course_id = ?";
        const rows = await db.query(query, [courseId]);
        return rows.map(CourseMaterial.fromRow);
    } catch (error) {
        throw new Error("Error fetching course materials by course ID: " + error.message);
    }
}
    static async getCourseMaterialById(materialId) {
        try {
        const query = "SELECT * FROM course_materials WHERE material_id = ?";
        const rows = await db.query(query, [materialId]);
        return CourseMaterial.fromRow(rows[0]);
        } catch (error) {
        throw new Error("Error fetching course material: " + error.message);
        }
    }
    static async getAllCourseMaterials() {
        try {
        const query = "SELECT * FROM course_materials";
        const rows = await db.query(query);
        return rows.map(CourseMaterial.fromRow);
        } catch (error) {
        throw new Error("Error fetching all course materials: " + error.message);
        }
    }
    static async courseMaterialExists(materialId) {
        try {
        const query = "SELECT * FROM course_materials WHERE material_id = ?";
        const rows = await db.query(query, [materialId]);
        return rows.length > 0 ? true : false;
        } catch (error) {
        throw new Error("Error fetching course material: " + error.message);
        }
    }
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