const InstructorRepository = require("../repositories/instructorRepository");
const userRepository = require("../repositories/userRepository");

class InstructorService {
  static async createInstructor(instructor) {
    try {
      if(! (await userRepository.userExistsById(instructor.userId))){
        throw new Error(`User ID: ${instructor.userId} does not exist`);
      }
      const user = await userRepository.getUserById(instructor.userId);
      if(user.userType !== 'instructor'){
        throw new Error('User is not an instructor');
      }
      return await InstructorRepository.createInstructor(instructor);
    } catch (error) {
      throw new Error("Error creating instructor: " + error.message);
    }
  }

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

  static async getInstructors() {
    try {
      return await InstructorRepository.getAllInstructors();
    } catch (error) {
      throw new Error("Error fetching instructors: " + error.message);
    }
  }

  static async updateInstructor(instructor) {
    try {
      
      const exists = await InstructorRepository.isInstructorExist(
        instructor.instructorId
      );
      if (!exists) {
        throw new Error(`Instructor ID: ${instructor.instructorId} does not exist`);
      }

      return await InstructorRepository.updateInstructor(instructor);
    } catch (error) {
      throw new Error("Error updating instructor: " + error.message);
    }
  }

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

static async getInstruvtorCourses(insId){
  try{
return await InstructorRepository.getInstructorCourses(id);
  }catch(error){
    throw new error ("error in getting the instructor courses "+error.message);
  }
}
}
module.exports = InstructorService;
