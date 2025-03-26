const categoryService = require("../services/categoryService");
const Category = require("../models/categoryModel");
class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      
      const category = await categoryService.getCategoryById(id);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

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
}

module.exports = CategoryController;
