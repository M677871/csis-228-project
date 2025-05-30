const express = require('express');
const courseMaterialController = require('../controllers/courseMaterialController');
const { validateMaterial, validateMaterialId } = require('../validators/material.dto');
const { requireLogin } = require('../middleware/authMiddleware'); 
const router = express.Router();

// Route for viewing all materials for a specific course
router.get('/courses/:courseId/materials', requireLogin, courseMaterialController.viewCourseMaterials);

// General Course Material API Endpoints (keep these if needed for other purposes)
router.get('/', courseMaterialController.getAllCourseMaterials);
router.get('/:id', validateMaterialId, courseMaterialController.getCourseMaterialById);
router.post('/', validateMaterial, courseMaterialController.createCourseMaterial);
router.put('/:id', validateMaterialId, validateMaterial, courseMaterialController.updateCourseMaterial);
router.delete('/:id', validateMaterialId, courseMaterialController.deleteCourseMaterial);

module.exports = router;