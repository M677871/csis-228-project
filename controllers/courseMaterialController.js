const courseMaterialService = require("../services/courseMaterialService");
const CourseMaterial = require("../models/courseMaterialModel");
const moment = require("moment");
class CourseMaterialController {
  static async getAllCourseMaterials(req, res) {
    try {
      const courseMaterials =
        await courseMaterialService.getAllCourseMaterials();
      return res.status(200).json(courseMaterials);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getCourseMaterialById(req, res) {
    try {
      const { id } = req.params;
      const courseMaterial = await courseMaterialService.getCourseMaterialById(
        id
      );

      return res.status(200).json(courseMaterial);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async createCourseMaterial(req, res) {
    try {
      const { courseId, title, materialType, filePath } = req.body;
      
      let material = new CourseMaterial(
        0,
        courseId,
        title,
        materialType,
        filePath,
        moment().format("YYYY-MM-DD")
      );
    
      const newCourseMaterial =
        await courseMaterialService.createCourseMaterial(material);
      return res.status(201).json({message:`course matrrial created successufly`, material:newCourseMaterial});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateCourseMaterial(req, res) {
    try {
      const { id } = req.params;
      
      const { courseId, title, materialType, filePath } = req.body;
     
      let material = new CourseMaterial(
        id,
        courseId,
        title,
        materialType,
        filePath,
        moment().format("YYYY-MM-DD")
      );
      const result = await courseMaterialService.updateCourseMaterial(material);
      return res.status(200).json({message:`course matrrial updated successufly`, material:result});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteCourseMaterial(req, res) {
    try {
      const { id } = req.params;
     
      const result = await courseMaterialService.deleteCourseMaterial(id);
      return res
        .status(200)
        .json({
          message: "Course material deleted successfully",
          material: result,
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports =  CourseMaterialController;
