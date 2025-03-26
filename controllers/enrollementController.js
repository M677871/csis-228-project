const enrollementService = require("../services/enrollementService");
const Enrollement = require("../models/enrollementModel");
const moment = require('moment');

class EnrollementController {
  static async createEnrollement(req, res) {
    try {
      const { studentId, courseId, status } = req.body;
     
      let enrollement = new Enrollement(
        0,
        studentId,
        courseId,
        status,
        moment().format("YYYY-MM-DD")
      );
      const result = await enrollementService.createEnrollement(enrollement);
      res.status(201).json({message :`enrollement created successufly`,resust:result});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEnrollements(req, res) {
    try {
      const enrollements = await enrollementService.getAllEnrollements();
      res.status(200).json(enrollements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getEnrollementById(req, res) {
    try {
      const { id } = req.params;
      
      const enrollement = await enrollementService.getEnrollementById(id);

      res.status(200).json(enrollement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateEnrollement(req, res) {
    try {
      const {id} = req.params;
      
      const { studentId, courseId, status } = req.body;
      
      let enrollement = new Enrollement(
        id,
        studentId,
        courseId,
        status,
        moment().format("YYYY-MM-DD")
      );

      const result = await enrollementService.updateEnrollement(enrollement);

      return res.status(200).json({message :`enrollement updated successufly`,resust:result});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteEnrollement(req, res) {
    try {
      const { id } = req.params;
     
      await enrollementService.deleteEnrollement(id);
      return res
        .status(200)
        .json({ message: "Enrollement deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = EnrollementController;
