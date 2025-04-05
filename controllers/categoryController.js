const categoryService = require("../services/categoryService");
const Category = require("../models/categoryModel");

/**
 * @class CategoryController
 * @description This class handles the management of categories, 
 * including retrieving, creating, updating, and deleting categories.
 */

class CategoryController {

 /**
   * @async
   * @description Retrieves all categories.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing all categories.
   */

  static async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  /**
   * @async
   * @description Retrieves a specific category by its unique ID.
   * @param {Object} req - The request object containing the category ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the category data.
   */

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      
      const category = await categoryService.getCategoryById(id);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Creates a new category.
   * @param {Object} req - The request object containing category details (categoryName, description).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the newly created category.
   */

  static async createCategory(req, res) {
    try {
      const { categoryName, description } = req.body;
    
      const newCategory = new Category(0, categoryName, description);
      const savedCategory = await categoryService.createCategory(newCategory);
      return res
        .status(201)
        .json({ message: `category created`, category: savedCategory });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Updates an existing category by its unique ID.
   * @param {Object} req - The request object containing the category ID 
   * in the params and updated details in the body (categoryName, description).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated category.
   */

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      
      const { categoryName, description } = req.body;
     
      const updatedCategory = new Category(id, categoryName, description);
      const result = await categoryService.updateCategory(updatedCategory);
      return res
        .status(200)
        .json({ message: `updated successsufly`, category: result });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Deletes a category by its unique ID.
   * @param {Object} req - The request object containing the category ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response indicating successful deletion of the category.
   */

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      
      const result = await categoryService.deleteCategory(id);

      return res
        .status(200)
        .json({ message: "Category deleted successfully", delete: result });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves all courses in a specific category.
   * @param {Object} req - The request object containing the category ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the courses in the category.
   */

  static async getCategoryCourses(req, res) {
    try {
      const { id } = req.params;
      
      const courses = await categoryService.getCategoryCourses(id);
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * @async
   * @description Retrieves all instructors associated with a specific category.
   * @param {Object} req - The request object containing the category ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the instructors associated with the category.
   */

static async getCategoryInstructors(req, res) {
    try {
      const { id } = req.params;
      
      const instructors = await categoryService.getCategoryInstructors(id);
      return res.status(200).json(instructors);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CategoryController;
