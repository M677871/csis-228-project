const courseMaterialRepository = require('../repositories/courseMaterialRepository');
const courseRepository = require('../repositories/courseRepository');
class CourseMaterialService {
  static async getAllCourseMaterials() {
    try {
      const courseMaterials = await courseMaterialRepository.getAllCourseMaterials();
      return courseMaterials;
    } catch (error) {
      throw new Error('Error fetching course materials: ' + error.message);
    }

  
  }

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

    static async createCourseMaterial(courseMaterial) {
  try {
    // Check if the course exists
    if (!(await courseRepository.courseExistsById(courseMaterial.courseId))) {
      throw new Error(`Course ID: ${courseMaterial.courseId} does not exist`);
    }

    // Check if material already exists for the course
    if (await courseMaterialRepository.courseMaterialExistsByCourseId(courseMaterial.courseId)) {
      throw new Error(`Course ID: ${courseMaterial.courseId} already has material`);
    }

 
    const newCourseMaterial = await courseMaterialRepository.createCourseMaterial(courseMaterial);
    return newCourseMaterial;
  } catch (error) {
    throw new Error(`Error creating course material for Course ID: ${courseMaterial.courseId}: ${error.message}`);
  }
}

    

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
}
module.exports = CourseMaterialService;