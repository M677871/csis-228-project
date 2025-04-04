const categoryRepository = require('../repositories/categoryRepository');
/**
 * Service class for handling category-related operations.
 * Provides methods to create, update, delete, and fetch categories, 
 * as well as associated courses and instructors.
 * 
 * @class
 */
class CategoryService {

 /**
   * Retrieves all categories.
   * 
   * @returns {Promise<Array>} A promise that resolves to an array of categories.
   * @throws {Error} Throws an error if there is an issue fetching categories.
   */

  static async getAllCategories() {
    try {
      const categories = await categoryRepository.getAllCategories();
      return categories;
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  }

  /**
   * Retrieves a category by its ID.
   * 
   * @param {number} id - The ID of the category to retrieve.
   * @returns {Promise<Object>} A promise that resolves to a category object.
   * @throws {Error} Throws an error if the category ID does not exist.
   */

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

  /**
   * Creates a new category.
   * 
   * @param {Object} category - The category object to be created.
   * @returns {Promise<Object>} A promise that resolves to the newly created category.
   * @throws {Error} Throws an error if there is an issue creating the category.
   */

  static async createCategory(category) {
    try {
      const newCategory = await categoryRepository.createCategory(category);
      return newCategory;
    } catch (error) {
      throw new Error('Error creating category: ' + error.message);
    }
  }

  /**
   * Updates an existing category.
   * 
   * @param {Object} categoryData - The updated category data.
   * @returns {Promise<Object>} A promise that resolves to the updated category.
   * @throws {Error} Throws an error if the category does not exist.
   */

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

  /**
   * Deletes a category by its ID.
   * 
   * @param {number} id - The ID of the category to delete.
   * @returns {Promise<void>} A promise that resolves when the category is deleted.
   * @throws {Error} Throws an error if the category does not exist.
   */

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

  /**
   * Retrieves courses associated with a category.
   * 
   * @param {number} id - The ID of the category.
   * @returns {Promise<Array>} A promise that resolves to an array of courses associated with the category.
   * @throws {Error} Throws an error if the category ID does not exist.
   */

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

  /**
   * Retrieves instructors associated with a category.
   * 
   * @param {number} id - The ID of the category.
   * @returns {Promise<Array>} A promise that resolves to an array of instructors associated with the category.
   * @throws {Error} Throws an error if the category ID does not exist.
   */

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