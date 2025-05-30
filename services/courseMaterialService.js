const courseMaterialRepository = require('../repositories/courseMaterialRepository');
const courseRepository = require('../repositories/courseRepository');


/**
 * Service class for handling course materials.
 * Provides methods to create, update, delete, and fetch course materials.
 * 
 * @class
 */
class CourseMaterialService {

  /**
   * Retrieves all course materials.
   * 
   * @returns {Promise<Array>} A promise that resolves to an array of course materials.
   * @throws {Error} Throws an error if there is an issue fetching course materials.
   */

  static async getAllCourseMaterials() {
    try {
      const courseMaterials = await courseMaterialRepository.getAllCourseMaterials();
      return courseMaterials;
    } catch (error) {
      throw new Error('Error fetching course materials: ' + error.message);
    }

  
  }

  /**
   * Retrieves a course material by its ID.
   * 
   * @param {number} id - The ID of the course material to retrieve.
   * @returns {Promise<Object>} A promise that resolves to a course material object.
   * @throws {Error} Throws an error if the course material ID does not exist.
   */

  static async getCourseMaterialById(id) {
    try {
      
      if (!(await courseMaterialRepository.courseMaterialExists(id))) {
        throw new Error(`Course Material ID: ${id} does not exist`);
      }
      const courseMaterial = await courseMaterialRepository.getCourseMaterialById(id);
      return courseMaterial;
    } catch (error) {
      throw new Error('Error fetching course material: ' + error.message);
    }
  }

  /**
   * Creates a new course material for a specific course.
   * 
   * @param {Object} courseMaterial - The course material object to be created.
   * @returns {Promise<Object>} A promise that resolves to the newly created course material.
   * @throws {Error} Throws an error if the course does not exist or if the material already exists for the course.
   */

    static async createCourseMaterial(courseMaterial) {
  try {
    
    if (!(await courseRepository.courseExistsById(courseMaterial.courseId))) {
      throw new Error(`Course ID: ${courseMaterial.courseId} does not exist`);
    }

   /*
    if (await courseMaterialRepository.courseMaterialExistsByCourseId(courseMaterial.courseId)) {
      throw new Error(`Course ID: ${courseMaterial.courseId} already has material`);
    }

 */
    const newCourseMaterial = await courseMaterialRepository.createCourseMaterial(courseMaterial);
    return newCourseMaterial;
  } catch (error) {
    throw new Error(`Error creating course material for Course ID: ${courseMaterial.courseId}: ${error.message}`);
  }
}

      /**
   * Updates an existing course material.
   * 
   * @param {Object} courseMaterialData - The updated course material data.
   * @returns {Promise<Object>} A promise that resolves to the updated course material.
   * @throws {Error} Throws an error if the material or course does not exist.
   */

  static async updateCourseMaterial(courseMaterialData) {
    try {
    if (!(await courseMaterialRepository.courseMaterialExists(courseMaterialData.materialId))) {
      throw new Error(`Course Material ID: ${courseMaterialData.materialId} does not exist`);
    }
    if (!(await courseRepository.courseExistsById(courseMaterialData.courseId))) {
      throw new Error(`Course ID: ${courseMaterialData.courseId} does not exist`);
    }
   
      const updatedCourseMaterial = await courseMaterialRepository.updateCourseMaterial( courseMaterialData);
      return updatedCourseMaterial;
      }
     catch (error) {
      throw new Error('Error updating course material: ' + error.message);
    }
  }

  /**
   * Deletes a course material by its ID.
   * 
   * @param {number} id - The ID of the course material to delete.
   * @returns {Promise<void>} A promise that resolves when the course material is deleted.
   * @throws {Error} Throws an error if the course material does not exist.
   */

  static async deleteCourseMaterial(id) {
    try{
        if (!(await courseMaterialRepository.courseMaterialExists(id))) {
            throw new Error(`Course Material ID: ${id} does not exist`);
        }
        await courseMaterialRepository.deleteCourseMaterial(id);
    }
    catch (error) {
        throw new Error('Error deleting course material: ' + error.message);
    }
}

static async getMaterialsByCourseId(courseId) {
    try {
      if (!(await courseRepository.courseExistsById(courseId))) {
        throw new Error(`Course ID: ${courseId} does not exist`);
      }
      const courseMaterials = await courseMaterialRepository.getCourseMaterialByCourseId(courseId);
      return courseMaterials; 

    }catch (error) {
      throw new Error('Error fetching course materials by course ID: ' + error.message);
    }
  }
}
module.exports = CourseMaterialService;