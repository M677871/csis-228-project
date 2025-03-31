const studentRepository = require('../repositories/studentRepository');
const User = require('../repositories/userRepository')

class StudentService {
  static async getAllStudents() {
    try {
      const students = await studentRepository.getAllStudents();
      return students;
    } catch (error) {
      throw new Error('Error fetching students: ' + error.message);
    }
  }

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