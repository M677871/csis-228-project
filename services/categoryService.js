const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
  static async getAllCategories() {
    try {
      const categories = await categoryRepository.getAllCategories();
      return categories;
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  }

  static async getCategoryById(id) {
    try {
      
      if (!(await categoryRepository.isCategoryExists(id))) {
        throw new Error(`Category ID: ${id} does not exist`);
      }
      const category = await categoryRepository.getCategoryById(id);
      return category;
    } catch (error) {
      throw new Error('Error fetching category: ' + error.message);
    }
  }

  static async createCategory(category) {
    try {
      const newCategory = await categoryRepository.createCategory(category);
      return newCategory;
    } catch (error) {
      throw new Error('Error creating category: ' + error.message);
    }
  }

  static async updateCategory( categoryData) {
    try {
      
      if (!(await categoryRepository.isCategoryExists(categoryData.categoryId))) {
        throw new Error(`Category ID: ${categoryData.categoryId} does not exist`);
      }
      const updatedCategory = await categoryRepository.updateCategory(categoryData);
      return updatedCategory;
    } catch (error) {
      throw new Error('Error updating category: ' + error.message);
    }
  }

  static async deleteCategory(id) {
    try{
      
        if (!(await categoryRepository.isCategoryExists(id))) {
            throw new Error(`Category ID: ${id} does not exist`);
        }
        await categoryRepository.deleteCategory(id);
    }
    catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
}
static async getCategoryCourses(id) {
    try {
      
      if (!(await categoryRepository.isCategoryExists(id))) {
        throw new Error(`Category ID: ${id} does not exist`);
      }
      const courses = await categoryRepository.getCategoryCourses(id);
      return courses;
    } catch (error) {
      throw new Error('Error fetching category courses: ' + error.message);
    }
  }
  static async getCategoryInstructors(id) {
    try {
      
      if (!(await categoryRepository.isCategoryExists(id))) {
        throw new Error(`Category ID: ${id} does not exist`);
      }
      const instructors = await categoryRepository.getCategoryInstructors(id);
      return instructors;
    } catch (error) {
      throw new Error('Error fetching category instructors: ' + error.message);
    }
  }
}
module.exports = CategoryService;