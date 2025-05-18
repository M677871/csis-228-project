const courseMaterialService = require("../services/courseMaterialService");
const CourseMaterial = require("../models/courseMaterialModel");
const moment = require("moment");

/**
 * @class CourseMaterialController
 * @description This class handles the management of course materials, including retrieving
 * , creating, updating, and deleting materials for courses.
 */

class CourseMaterialController {

  /**
   * @async
   * @description Retrieves all course materials.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing all course materials.
   */

  static async getAllCourseMaterials(req, res) {
    try {
      const courseMaterials =
        await courseMaterialService.getAllCourseMaterials();
      return res.status(200).json(courseMaterials);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves a specific course material by its unique ID.
   * @param {Object} req - The request object containing the course material ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the course material data.
   */

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

  /**
   * @async
   * @description Creates a new course material.
   * @param {Object} req - The request object containing course material details (courseId, title, materialType, filePath).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the newly created course material.
   */

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

  /**
   * @async
   * @description Updates an existing course material by its unique ID.
   * @param {Object} req - The request object containing the course material ID 
   * in the params and updated details in the body (courseId, title, materialType, filePath).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated course material.
   */

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

  /**
   * @async
   * @description Deletes a course material by its unique ID.
   * @param {Object} req - The request object containing the course material ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response indicating successful deletion of the course material.
   */

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

  static showMaterialForm(req, res) {
    try {
      
    res.render("courseMaterial.ejs", { error: null });
    }
    catch (error) {
      console.error("Error rendering material form:", error);
      return res.status(500).send("Internal Server Error");
    }
  } 


  static async createMaterialForm(req, res) {
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
      
      return res.redirect("/instructor");
    } catch (error) {
      console.error("Error during material creation:", error);
      return res.render("courseMaterial.ejs", {
        error: "Material course creation failed. Please try again.",
      });
    }
  }
}

module.exports =  CourseMaterialController;
