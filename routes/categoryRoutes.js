const express = require('express');
const categoryController = require('../controllers/categoryController');
const {validateCategory, validateCategoryId} = require('../validators/category.dto');
const router = express.Router();


router.get('/', categoryController.getAllCategories);

router.get('/:id',validateCategoryId, categoryController.getCategoryById);

router.post('/',validateCategory, categoryController.createCategory);

router.put('/:id',validateCategoryId,validateCategory, categoryController.updateCategory);

router.delete('/:id',validateCategoryId, categoryController.deleteCategory);

module.exports = router;