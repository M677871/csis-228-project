const studentRepository = require('../repositories/studentRepository');
const UserRepository = require('../repositories/userRepository'); // Corrected import name to UserRepository

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
   * Retrieves a student by their ID (primary key of students table).
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
   * Retrieves a student by their User ID (foreign key to users table).
   *
   * @param {number} userId - The user ID associated with the student.
   * @returns {Student|null} - A promise that resolves to the student object or null if not found.
   * @throws {Error} - Throws an error if the operation fails.
   */
  static async getStudentByUserId(userId) {
    try {
      const student = await studentRepository.getStudentByUserId(userId);
      return student; // Can be null if not found
    } catch (error) {
      throw new Error('Error fetching student by user ID: ' + error.message);
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
      // Check if a student profile already exists for this user ID
      if (await studentRepository.isStudentExistByUserId(student.userId)) { // <--- FIX: Corrected logic
        throw new Error(`Student with userId: ${student.userId} already exists`);
      }
      // Check if the user exists
      if (!(await UserRepository.userExistsById(student.userId))) { // <--- FIX: Corrected import usage
        throw new Error(`User ID: ${student.userId} does not exist`);
      }
      // Check if the user's type is 'student'
      const user = await UserRepository.getUserById(student.userId); // <--- FIX: Corrected import usage
      if (user.userType !== 'student') {
        throw new Error('User is not a student type');
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
  static async updateStudent(studentData) {
    try {
      // Check if the student profile (by studentId) exists
      const existingStudent = await studentRepository.getStudentById(studentData.studentId); // Get by studentId PK
      if (!existingStudent) {
        throw new Error(`Student ID: ${studentData.studentId} does not exist`);
      }

      // Check if the user (by userId) exists
      if (!(await UserRepository.userExistsById(studentData.userId))) { // <--- FIX: Corrected import usage
        throw new Error(`User ID: ${studentData.userId} does not exist`);
      }

      // Check if the user's type is 'student'
      const user = await UserRepository.getUserById(studentData.userId); // <--- FIX: Corrected import usage
      if (user.userType !== 'student') {
        throw new Error('User is not a student type');
      }

      // If changing userId, ensure the new userId is not already associated with another student profile
      if (studentData.userId !== existingStudent.userId) { // <--- FIX: Corrected logic and variable name
        if (await studentRepository.isStudentExistByUserId(studentData.userId)) {
          throw new Error(`User ID: ${studentData.userId} is already associated with another student profile`);
        }
      }

      const updatedStudent = await studentRepository.updateStudent(studentData);
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

  static async getStudentQuizzes(id) {
    try {
      if (!(await studentRepository.studentExists(id))) {
        throw new Error(`Student ID: ${id} does not exist`);
      }
      const quizzes = await studentRepository.getStudentQuizzes(id);
      return quizzes;
    } catch (error) {
      throw new Error('Error fetching student quizzes: ' + error.message);
    }
  }
}
module.exports = StudentService;
