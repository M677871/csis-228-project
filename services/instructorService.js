const InstructorRepository = require("../repositories/instructorRepository");
const userRepository = require("../repositories/userRepository");

/**
 * The `InstructorService` class provides methods for managing instructors.
 * It handles the creation, retrieval, updating, and deletion of instructors.
 * The class ensures that all actions are tied to valid user data and instructor IDs.
 * 
 * @class
 */


class InstructorService {

  /**
   * Creates a new instructor.
   * 
   * @param {Object} instructor - The instructor data.
   * @returns {Object} - A promise that resolves to the newly created instructor object.
   * @throws {Error} - Throws an error if the user does not exist, if the user is not an instructor,
   *                   or if the instructor already exists.
   */

  static async createInstructor(instructor) {
    try {
      if(! (await userRepository.userExistsById(instructor.userId))){
        throw new Error(`User ID: ${instructor.userId} does not exist`);
      }
      if (await InstructorRepository.isInstructorExistByUserId(instructor.userId)) {
        throw new Error(`Instructor with user ID: ${instructor.userId} already exists`);
      }
    
      const user = await userRepository.getUserById(instructor.userId);
      if(user.userType !== 'instructor'){
        throw new Error('User is not an instructor');
      }
      if (await InstructorRepository.isInstructorExist(instructor.userId)) {
        throw new Error(`Instructor with user ID: ${instructor.userId} already exists`);
      }
      return await InstructorRepository.createInstructor(instructor);
    } catch (error) {
      console.log(error);
      throw new Error("Error creating instructor: " + error.message);
    }
  }

  /**
   * Retrieves an instructor by their ID.
   * 
   * @param {number} instructorId - The ID of the instructor to retrieve.
   * @returns {Object} - A promise that resolves to the instructor object.
   * @throws {Error} - Throws an error if the instructor does not exist.
   */


  static async getInstructorById(instructorId) {
    try {
      if(! (await InstructorRepository.isInstructorExist(instructorId))){
        throw new Error(`Instructor ID: ${instructorId} does not exist`);
      }

      
      const instructor = await InstructorRepository.getInstructorById(
        instructorId
      );

     

      return instructor;
    } catch (error) {
      throw new Error("Error fetching instructor: " + error.message);
    }
  }

  /**
   * Retrieves a list of all instructors.
   * 
   * @returns {Array} - A promise that resolves to an array of instructor objects.
   * @throws {Error} - Throws an error if fetching instructors fails.
   */

  static async getInstructors() {
    try {
      return await InstructorRepository.getAllInstructors();
    } catch (error) {
      throw new Error("Error fetching instructors: " + error.message);
    }
  }

  /**
   * Updates an existing instructor's information.
   * 
   * @param {Object} instructor - The updated instructor data.
   * @returns {Object} - A promise that resolves to the updated instructor object.
   * @throws {Error} - Throws an error if the instructor or user does not exist, 
   *                   or if the instructor with the provided user ID already exists.
   */

  static async updateInstructor(instructor) {
    try {
        const exists = await InstructorRepository.isInstructorExist(instructor.instructorId);
        if (!exists) {
            throw new Error(`Instructor ID: ${instructor.instructorId} does not exist`);
        }
        if(! (await userRepository.userExistsById(instructor.userId))){
          throw new Error(`User ID: ${instructor.userId} does not exist`);
        }

        let instructorData = await InstructorRepository.getInstructorById(instructor.instructorId);
        let user = await userRepository.getUserById(instructor.userId);
        if(user.userType !== 'instructor'){
          throw new Error('User is not an instructor');
        }
        if (instructorData.userId !== instructor.userId) {
            if (await InstructorRepository.isInstructorExistByUserId(instructor.userId)) {
                throw new Error(`Instructor with user ID: ${instructor.userId} already exists`);
            }
        }
        return await InstructorRepository.updateInstructor(instructor);
    } catch (error) {
        throw new Error("Error updating instructor: " + error.message);
    }
}

  /**
   * Deletes an instructor by their ID.
   * 
   * @param {number} instructorId - The ID of the instructor to delete.
   * @returns {void} - A promise that resolves once the instructor is deleted.
   * @throws {Error} - Throws an error if the instructor does not exist.
   */

  static async deleteInstructor(instructorId) {
    try {
      
      const exists = await InstructorRepository.isInstructorExist(instructorId);
      if (!exists) {
        throw new Error(`Instructor ID: ${instructorId} does not exist`);
      }

      return await InstructorRepository.deleteInstructor(instructorId);
    } catch (error) {
      throw new Error("Error deleting instructor: " + error.message);
    }
  }

 /**
   * Retrieves the courses taught by a specific instructor.
   * 
   * @param {number} insId - The ID of the instructor.
   * @returns {Array} - A promise that resolves to an array of courses taught by the instructor.
   * @throws {Error} - Throws an error if the instructor does not exist or fetching the courses fails.
   */

static async getInstruvtorCourses(insId){
  try{
    if(! (await InstructorRepository.isInstructorExist(insId))){
      throw new Error(`Instructor ID: ${insId} does not exist`);
     
    }

   return await InstructorRepository.getInstructorCourses(insId);
  }catch(error){
    throw new Error ("error in getting the instructor courses :"+error.message);
  }
}
}
module.exports = InstructorService;
