const studentService = require("../services/studentService");
const Student = require("../models/studentModel");

class StudentController {
  static async getAllStudents(req, res) {
    try {
      const students = await studentService.getAllStudents();
     return res.status(200).json({message:"The students are:",student:students});
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

 static async getStudentById(req, res) {
    try {
      const { id } = req.params;
     
      const student = await studentService.getStudentById(id);
     
     return res.status(200).json(student);
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

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

static  async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const deletedStudent = await studentService.deleteStudent(id);
      
    return  res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }
  static async getStudentCourses(req, res) {
    try {
      const { id } = req.params;
      const courses = await studentService.getStudentCourses(id);
    return  res.status(200).json({message:"The courses are:",courses:courses});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = StudentController;
