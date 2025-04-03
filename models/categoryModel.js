/**
 * Represents a course category in the system.
 * 
 * @class
 * @property {number} categoryId - The unique identifier for the category.
 * @property {string} categoryName - The name of the category.
 * @property {string} description - A brief description of the category.
 */


class Category{

   /**
   * Creates an instance of the Category class.
   * 
   * @param {number} categoryId - The unique identifier for the category.
   * @param {string} categoryName - The name of the category.
   * @param {string} description - A brief description of the category.
   */

    constructor(categoryId, categoryName , description){
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.description = description;
    }

   /**
   * Creates a Category instance from a database row.
   * 
   * @param {Object} row - The database row containing category data.
   * @param {number} row.category_id - The unique identifier for the category.
   * @param {string} row.category_name - The name of the category.
   * @param {string} row.description - A brief description of the category.
   * @returns {Category} - A new Category instance created from the provided row data.
   */


    static fromRow(row){
        return new Category(
            row.category_id,
            row.category_name,
            row.description
        );
    }
}

module.exports = Category;