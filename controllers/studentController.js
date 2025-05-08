const studentService = require("../services/studentService");
const Student = require("../models/studentModel");

/**
 * @class StudentController
 * @description The StudentController class handles all operations
 *  related to students such as fetching all students, creating, 
 * updating, deleting students, and retrieving student courses.
 */

class StudentController {

  /**
   * @async
   * @description Retrieves all students from the system.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the list of all students.
   */

  static async getAllStudents(req, res) {
    try {
      const students = await studentService.getAllStudents();
     return res.status(200).json({message:"The students are:",student:students});
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a student by their unique ID.
   * @param {Object} req - The request object containing the student ID.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the student's data.
   */


 static async getStudentById(req, res) {
    try {
      const { id } = req.params;
     
      const student = await studentService.getStudentById(id);
     
     return res.status(200).json(student);
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Creates a new student with the provided data.
   * @param {Object} req - The request object containing the student's 
   * information (userId, first name, last name, dob, profile picture).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the created student.
   */

  static async createStudent(req, res) {
    try {
      const { userId, stuFName, stuLName, dob, profilePicture } = req.body;
     
      let student = new Student(
        0,
        userId,
        stuFName,
        stuLName,
        dob,
        profilePicture
      );
      const newStudent = await studentService.createStudent(student);
    return  res.status(201).json({message:`student created successufly`,student:newStudent});
    } catch (error) {
    return  res.status(400).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Updates the information of an existing student by their unique ID.
   * @param {Object} req - The request object containing the student ID and updated data.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated student data.
   */

 static async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { userId, stuFName, stuLName, dob, profilePicture } = req.body;
     
     
      let student = new Student(
        id,
        userId,
        stuFName,
        stuLName,
        dob,
        profilePicture
      );

      const updatedStudent = await studentService.updateStudent(student);
      
     return res.status(200).json({message:"student updated successufly",student:updatedStudent});
    } catch (error) {
     return res.status(400).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Deletes a student by their unique ID.
   * @param {Object} req - The request object containing the student ID.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message.
   */

static  async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const deletedStudent = await studentService.deleteStudent(id);
      
    return  res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves the courses associated with a specific student.
   * @param {Object} req - The request object containing the student ID.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the list of courses the student is enrolled in.
   */

  static async getStudentCourses(req, res) {
    try {
      const { id } = req.params;
      const courses = await studentService.getStudentCourses(id);
    return  res.status(200).json({message:"The courses are:",courses:courses});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


static async loadStudentsView(req, res) {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);
    const courses = await studentService.getStudentCourses(id);
    const quizzes = await studentService.getStudentQuizzes(id);

    return res.render('studentView', {
      title: 'Student Dashboard',
      student,
      courses,
      quizzes
    });
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    return res.status(500).send('Internal Server Error');
  }
}



}

module.exports = StudentController;
