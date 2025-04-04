const studentRepository = require('../repositories/studentRepository');
const User = require('../repositories/userRepository')

/**
 * The `StudentService` class provides methods to manage student data, including fetching student details,
 * creating, updating, deleting students, and retrieving their courses.
 * 
 * @class
 */


class StudentService {

 /**
   * Retrieves all students from the database.
   * 
   * @returns {Student[]} - A promise that resolves to an array of student objects.
   * @throws {Error} - Throws an error if the operation fails.
   */

  static async getAllStudents() {
    try {
      const students = await studentRepository.getAllStudents();
      return students;
    } catch (error) {
      throw new Error('Error fetching students: ' + error.message);
    }
  }

  /**
   * Retrieves a student by their ID.
   * 
   * @param {number} id - The ID of the student to retrieve.
   * @returns {Student} - A promise that resolves to the student object.
   * @throws {Error} - Throws an error if the student does not exist or the operation fails.
   */

  static async getStudentById(id) {
    try {
      
      if (!(await studentRepository.studentExists(id))) {
        throw new Error(`Student ID: ${id} does not exist`);
      }
      const student = await studentRepository.getStudentById(id);
      return student;
    } catch (error) {
      throw new Error('Error fetching student: ' + error.message);
    }
  }

  /**
   * Creates a new student.
   * 
   * @param {Object} student - The student data.
   * @returns {Student} - A promise that resolves to the newly created student object.
   * @throws {Error} - Throws an error if the student already exists, the user does not exist, or the user is not a student.
   */

  static async createStudent(student) {
    try {
      if(! await studentRepository.getStudentByUserId(student.studentId)){
        throw new Error(`student by userId: ${student.userId} already exist`);
      }
      if(! (await User.userExistsById(student.userId))) {
        throw new Error(`User ID: ${student.userId} does not exist`);
      }
     const  user = await User.getUserById(student.userId);
      if(user.userType !== 'student'){
        throw new Error('User is not a student');
      }
     
      const newStudent = await studentRepository.createStudent(student);
      return newStudent;
    } catch (error) {
      throw new Error('Error creating student: ' + error.message);
    }
  }

  /**
   * Updates an existing student's information.
   * 
   * @param {Object} studentData - The updated student data.
   * @returns {Student} - A promise that resolves to the updated student object.
   * @throws {Error} - Throws an error if the student does not exist, the user does not exist, or the user is not a student.
   */

  static async updateStudent( studentData) {
    try {
    
      const studentExists = await studentRepository.studentExists(studentData.studentId);
      if (!studentExists) {
        return res.status(404).json({ message: `Student ID: ${studentData.studentId} does not exist` });
      }
      if(!await User.userExistsById(studentData.userId)){
        throw new Error(`User ID: ${studentData.userId} does not exist`);
      }
      let instructorData = await studentRepository.getStudentById(studentData.studentId);
      
      let userData = await User.getUserById(instructorData.userId);

      if(userData.userType !== 'student'){
        throw new Error('User is not a student');
      }
      if (studentData.userId !== instructorData.userId) {
        if (await studentRepository.isStudentExistByUserId(studentData.userId)) {
          throw new Error(`User ID: ${studentData.userId} already exists`);
        }
      }

      const updatedStudent = await studentRepository.updateStudent( studentData);
      return updatedStudent;
    } catch (error) {
      throw new Error('Error updating student: ' + error.message);
    }
  }

  /**
   * Deletes a student by their ID.
   * 
   * @param {number} id - The ID of the student to delete.
   * @returns {void} - A promise that resolves once the student is deleted.
   * @throws {Error} - Throws an error if the student does not exist or the operation fails.
   */

  static async deleteStudent(id) {
    try {
      
      if (!(await studentRepository.studentExists(id))) {
        throw new Error(`Student ID: ${id} does not exist`);
      }
      await studentRepository.deleteStudent(id);
    } catch (error) {
      throw new Error('Error deleting student: ' + error.message);
    }
  }

  /**
   * Retrieves a student's courses by their ID.
   * 
   * @param {number} id - The ID of the student to retrieve courses for.
   * @returns {Course[]} - A promise that resolves to an array of courses the student is enrolled in.
   * @throws {Error} - Throws an error if the student does not exist or the operation fails.
   */

  static async getStudentCourses(id) {
    try {
      if (!(await studentRepository.studentExists(id))) {
        throw new Error(`Student ID: ${id} does not exist`);
      }
      const courses = await studentRepository.getStudentCourses(id);
      return courses;
    } catch (error) {
      throw new Error('Error fetching student courses: ' + error.message);
    }
  }
}
module.exports = StudentService;