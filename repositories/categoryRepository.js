const db = require("../config/db");
const Category = require("../models/categoryModel");

class CategoryRepository {
    static async createCategory(category) {
        try {
            const query = `INSERT INTO categories (category_name , description) VALUES (?,?)`;
            const { affectedRows } = await db.query(query, [
                category.categoryName,
                category.description
            ]);
            return affectedRows;
        } catch (error) {
            throw new Error("Error creating category: " + error.message);
        }
}
static async getCategoryById(categoryId) {
    try {
        const query = "SELECT * FROM categories WHERE category_id = ?";
        const rows = await db.query(query, [categoryId]);
        return Category.fromRow(rows[0]);
    } catch (error) {
        throw new Error("Error fetching category: " + error.message);
    }
}
static async getAllCategories() {
    try {
        const query = "SELECT * FROM categories";
        const rows = await db.query(query);
        return rows.map(Category.fromRow);
    } catch (error) {
        throw new Error("Error fetching all categories: " + error.message);
    }
}
static async updateCategory(category) {
    try {
        const query = `UPDATE categories SET category_name=?,description=? WHERE category_id = ?`;
        const { affectedRows } = await db.query(query, [
            category.categoryName,
            category.description,
            category.categoryId
        ]);
        return affectedRows;
    } catch (error) {
        throw new Error("Error updating category: " + error.message);
    }
}
static async deleteCategory(categoryId) {
    try {
        const query = `DELETE FROM categories WHERE category_id = ?`;
        const { affectedRows } = await db.query(query, [categoryId]);
        return affectedRows;
    } catch (error) {
        throw new Error("Error deleting category: " + error.message);
    }
}
static async getCategoryCourses(categoryId) {
    try {
        const query = `SELECT * FROM courses WHERE category_id = ?`;
        const [rows] = await db.query(query, [categoryId]);
        return rows;
    } catch (error) {
        throw new Error("Error fetching category courses: " + error.message);
    }
}

static async isCategoryExists(categoryId) {
    try {
        const query = `SELECT * FROM categories WHERE category_id = ?`;
        const rows = await db.query(query, [categoryId]);
        return rows.length > 0 ? true : false;
    } catch (error) {
        throw new Error("Error checking category: " + error.message);
    }
}

}
module.exports = CategoryRepository;