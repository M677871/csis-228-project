const InstructorRepository = require("../repositories/instructorRepository");
const userRepository = require("../repositories/userRepository");

class InstructorService {
  static async createInstructor(instructor) {
    try {
      if(! (await userRepository.userExistsById(instructor.userId))){
        throw new Error(`User ID: ${instructor.userId} does not exist`);
      }
      if (await InstructorRepository.getInstructorByUserId(instructor.userId)) {
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
