const express = require('express');
const courseMaterialController = require('../controllers/courseMaterialController');
const {validateMaterial, validateMaterialId} = require('../validators/material.dto');
const router = express.Router();


router.get('/', courseMaterialController.getAllCourseMaterials);
router.get('/:id',validateMaterialId, courseMaterialController.getCourseMaterialById);
router.post('/',validateMaterial, courseMaterialController.createCourseMaterial);
router.put('/:id',validateMaterialId,validateMaterial, courseMaterialController.updateCourseMaterial);
router.delete('/:id',validateMaterialId, courseMaterialController.deleteCourseMaterial);

module.exports = router;