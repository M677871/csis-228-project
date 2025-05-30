// controllers/courseMaterialController.js

const courseMaterialService = require("../services/courseMaterialService");
const CourseMaterial = require("../models/courseMaterialModel");
const CourseService = require("../services/courseService"); // Correctly imported as CourseService
const instructorService = require("../services/instructorService"); // Correctly imported as instructorService

const moment = require("moment");

/**
 * @class CourseMaterialController
 * @description This class handles the management of course materials, including retrieving
 * , creating, updating, and deleting materials for courses.
 * Note: The 'addMaterial' form submission is handled by InstructorController.addMaterial.
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
            const courseMaterials = await courseMaterialService.getAllCourseMaterials();
            return res.status(200).json(courseMaterials);
        } catch (error) {
            console.error('Error in getAllCourseMaterials:', error);
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
            const id = Number(req.params.id); // Ensure ID is a number
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid material ID' });
            }
            const courseMaterial = await courseMaterialService.getCourseMaterialById(id);
            if (!courseMaterial) {
                return res.status(404).json({ message: 'Course material not found' });
            }
            return res.status(200).json(courseMaterial);
        } catch (error) {
            console.error('Error in getCourseMaterialById:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    /**
     * @async
     * @description Creates a new course material (typically via API, not instructor form).
     * @param {Object} req - The request object containing course material details (courseId, title, materialType, filePath).
     * @param {Object} res - The response object.
     * @returns {Object} JSON response containing the newly created course material.
     */
    static async createCourseMaterial(req, res) {
        try {
            const { courseId, title, materialType, filePath } = req.body;
            let material = new CourseMaterial(
                0,
                Number(courseId), // Ensure courseId is a number
                title,
                materialType,
                filePath,
                moment().format("YYYY-MM-DD HH:mm:ss") // Use full timestamp format
            );

            const newCourseMaterial = await courseMaterialService.createCourseMaterial(material);
            return res.status(201).json({ message: `Course material created successfully`, material: newCourseMaterial });
        } catch (error) {
            console.error('Error in createCourseMaterial (API):', error);
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
            const id = Number(req.params.id); // Ensure ID is a number
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid material ID' });
            }
            const { courseId, title, materialType, filePath } = req.body;

            let material = new CourseMaterial(
                id,
                Number(courseId), // Ensure courseId is a number
                title,
                materialType,
                filePath,
                moment().format("YYYY-MM-DD HH:mm:ss") // Use full timestamp format
            );
            const result = await courseMaterialService.updateCourseMaterial(material);
            if (!result) {
                return res.status(404).json({ message: 'Course material not found for update' });
            }
            return res.status(200).json({ message: `Course material updated successfully`, material: result });
        } catch (error) {
            console.error('Error in updateCourseMaterial:', error);
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
            const id = Number(req.params.id); // Ensure ID is a number
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid material ID' });
            }
            const result = await courseMaterialService.deleteCourseMaterial(id);
            if (!result) {
                return res.status(404).json({ message: 'Course material not found for deletion' });
            }
            return res.status(200).json({
                message: "Course material deleted successfully",
                material: result, // result might be true/false or deleted object
            });
        } catch (error) {
            console.error('Error in deleteCourseMaterial:', error);
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @async
     * @description Renders the view to display all materials for a specific course.
     * Fetches course, instructor, and material details to populate the view.
     * @param {Object} req - The Express request object, containing courseId in params.
     * @param {Object} res - The Express response object.
     */
    static async viewCourseMaterials(req, res) {
        try {
            const courseId = Number(req.params.courseId); // Convert to Number
            if (isNaN(courseId)) {
                req.flash('error', 'Invalid course ID provided.');
                return res.redirect('/instructor/dashboard');
            }

            console.log(`[CourseMaterialController.viewCourseMaterials] Attempting to fetch course and materials for course ID: ${courseId} Type: ${typeof courseId}`);

            // Fetch course details (using CourseService with capital C)
            const course = await CourseService.getCourseById(courseId);
            if (!course) {
                req.flash('error', `Course with ID ${courseId} not found.`);
                return res.redirect('/instructor/dashboard'); // Or a generic courses page
            }

            // Fetch instructor details (using instructorService with lowercase i)
            const instructor = await instructorService.getInstructorById(course.instructorId);

            // Fetch materials using the CourseMaterialService
            const materials = await courseMaterialService.getMaterialsByCourseId(courseId);
            console.log('[CourseMaterialController.viewCourseMaterials] Materials data:', materials);

            res.render('courseMaterialView', { // Assuming this is your EJS file to display materials
                title: course.courseName,
                user: req.session.user, // Assuming user is in session
                course,
                materials,
                instructor,
                success: req.flash('success'),
                error: req.flash('error')
            });
        } catch (error) {
            console.error('Error viewing course materials:', error);
            req.flash('error', 'Failed to load course materials: ' + error.message);
            res.redirect('/instructor/dashboard'); // Redirect to instructor dashboard on error
        }
    }

    // --- REMOVED METHODS ---
    // The following methods are removed as they are either handled by InstructorController
    // or represent a different, less integrated material creation flow:
    // static showMaterialForm(req, res) { ... }
    // static async createMaterialForm(req, res) { ... }
    // static async addCourseMaterial(req, res) { ... } // This specific one is handled by InstructorController.addMaterial
}

module.exports = CourseMaterialController;
