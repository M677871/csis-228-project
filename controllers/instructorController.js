const instructorService = require('../services/instructorService');
const Instructor = require('../models/instructorModel');
const courseService = require('../services/courseService');
const courseMaterialService = require('../services/courseMaterialService'); // ADDED: Required for material-related operations
const categoryService = require('../services/categoryService'); // Required for fetching categories in createCourse form
const moment = require('moment'); // Required for timestamps


const requireInstructorLogin = (req, res, next) => {
    if (req.session.user && req.session.user.userType === "instructor") {
        // If instructorId is not in session, try to fetch it
        if (!req.session.user.instructorId) {
            console.warn(`[requireInstructorLogin] Instructor user found, but instructorId missing from session for userId: ${req.session.user.userId}`);
            instructorService.getInstructorByUserId(req.session.user.userId)
                .then(instructorProfile => {
                    if (instructorProfile) {
                        req.session.user.instructorId = instructorProfile.instructorId;
                        console.log(`[requireInstructorLogin] Updated session with instructorId: ${instructorProfile.instructorId}`);
                        next();
                    } else {
                        // This case implies a user is marked as instructor but has no instructor profile
                        console.error(`[requireInstructorLogin] No instructor profile found for userId: ${req.session.user.userId}`);
                        req.flash('error', 'Instructor profile not found. Please complete your instructor registration.');
                        res.redirect('/login'); // Redirect to login or a registration page
                    }
                })
                .catch(error => {
                    console.error('[requireInstructorLogin] Error fetching instructor profile during login check:', error);
                    req.flash('error', 'Authentication error. Please log in again.');
                    res.redirect('/login');
                });
        } else {
            // Instructor is logged in and instructorId is in session, proceed
            next();
        }
    } else if (req.session.user) {
        // User is logged in but not an instructor
        req.flash('error', 'You do not have permission to access the instructor dashboard.');
        return res.redirect(`/${req.session.user.userType}/dashboard`); // Redirect to their specific dashboard
    } else {
        // User is not logged in
        req.flash('error', 'Please log in to access the instructor dashboard.');
        res.redirect("/login");
    }
};

class InstructorController {

    static async getAllInstructors(req, res) {
        try {
            const instructors = await instructorService.getInstructors();
            return res.status(200).json(instructors);
        } catch (error) {
            console.error('Error in getAllInstructors:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async getInstructorById(req, res) {
        try {
            const { id } = req.params;
            const instructor = await instructorService.getInstructorById(id);
            if (!instructor) {
                return res.status(404).json({ message: 'Instructor not found' });
            }
            return res.status(200).json(instructor);
        } catch (error) {
            console.error('Error in getInstructorById:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async createInstructor(req, res) {
        try {
            const { userId, insFName, insLName, bio, profilePicture } = req.body;
            let instructor = new Instructor(0, userId, insFName, insLName, bio, profilePicture);
            const newInstructor = await instructorService.createInstructor(instructor);
            return res.status(201).json({ message: `Instructor created successfully`, instructor: newInstructor });
        } catch (error) {
            console.error('Error in createInstructor:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateInstructor(req, res) {
        try {
            const { id } = req.params;
            const { userId, insFName, insLName, bio, profilePicture } = req.body;
            let instructor = new Instructor(id, userId, insFName, insLName, bio, profilePicture)
            const updatedInstructor = await instructorService.updateInstructor(instructor);
            if (!updatedInstructor) {
                return res.status(404).json({ message: 'Instructor not found for update' });
            }
            return res.status(200).json({ message: `Instructor updated successfully`, instructor: updatedInstructor });
        } catch (error) {
            console.error('Error in updateInstructor:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteInstructor(req, res) {
        try {
            const { id } = req.params;
            const deleted = await instructorService.deleteInstructor(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Instructor not found for deletion' });
            }
            return res.status(200).json({ message: 'Instructor deleted successfully' });
        } catch (error) {
            console.error('Error in deleteInstructor:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async getInstructorCourses(req, res) {
        try {
            const { id } = req.params;
            const courses = await courseService.getCoursesByInstructorId(id); // Assuming courseService.getCoursesByInstructorId
            return res.status(200).json({ message: `The instructor's courses`, instructorCourses: courses })
        } catch (error) {
            console.error('Error in getInstructorCourses:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    /**
     * @async
     * @description Renders the instructor dashboard with relevant data.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async getInstructorDashboard(req, res) {
        try {
            const instructorUserId = req.session.user.userId;
            console.log(`[InstructorController.getInstructorDashboard] Attempting to fetch instructor profile for userId: ${instructorUserId}`);

            const instructorProfile = await instructorService.getInstructorByUserId(instructorUserId);

            if (!instructorProfile) {
                console.warn(`[InstructorController.getInstructorDashboard] Instructor profile NOT found for userId: ${instructorUserId}. Redirecting.`);
                req.flash('error', 'Instructor profile not found. Please complete your instructor registration.');
                return res.redirect('/');
            }
            // This check is already done by requireInstructorLogin, but good to have as a fallback
            if (!req.session.user.instructorId) {
                req.session.user.instructorId = instructorProfile.instructorId;
            }
            console.log(`[InstructorController.getInstructorDashboard] Instructor profile found: ${instructorProfile.insFName} ${instructorProfile.insLName}`);

            const taughtCourses = await courseService.getCoursesByInstructorId(instructorProfile.instructorId);
            console.log(`[InstructorController.getInstructorDashboard] Fetched ${taughtCourses ? taughtCourses.length : 0} courses for instructor.`);
            console.log(`[InstructorController.getInstructorDashboard] Taught courses data:`, taughtCourses);

            console.log('[InstructorController.getInstructorDashboard] Attempting to render instructorView.ejs');
            res.render('instructorView', {
                title: 'Instructor Dashboard',
                user: req.session.user,
                instructor: instructorProfile,
                courses: taughtCourses,
                success: req.flash('success'),
                error: req.flash('error'),
            });
        } catch (error) {
            console.error('Error fetching instructor dashboard:', error);
            req.flash('error', 'Failed to load instructor dashboard. Please try again.');
            res.redirect('/');
        }
    }

    /**
     * @description Renders the form for creating a new course.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async showCreateCourseForm(req, res) {
        try {
            console.log('[InstructorController.showCreateCourseForm] Attempting to fetch categories...');
            const categories = await categoryService.getAllCategories();
            console.log(`[InstructorController.showCreateCourseForm] Fetched ${categories.length} categories.`);
            res.render('createCourse', {
                title: 'Create New Course',
                user: req.session.user,
                categories: categories,
                course: null, // Pass null for an empty form initially
                error: req.flash('error'),
                success: req.flash('success')
            });
        } catch (error) {
            console.error('Error rendering create course form:', error);
            req.flash('error', 'Failed to load course creation form: ' + error.message);
            res.redirect('/instructor/dashboard');
        }
    }

    /**
     * @async
     * @description Handles the POST request to create a new course.
     * Automatically assigns the logged-in instructor's ID to the course.
     * Redirects to add materials for the newly created course.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async createCourse(req, res) {
        const instructorId = req.session.user.instructorId; // Already ensured by requireInstructorLogin

        const { courseName, description, categorieId } = req.body;

        try {
            if (!courseName || !description || !categorieId) {
                req.flash('error', 'All fields are required to create a course.');
                const categories = await categoryService.getAllCategories();
                return res.render('createCourse', {
                    title: 'Create Course',
                    user: req.session.user,
                    categories,
                    course: req.body,
                    error: req.flash('error'),
                    success: req.flash('success')
                });
            }

            const newCourseData = {
                instructorId,
                courseName,
                description,
                categorieId: Number(categorieId), // Ensure it's a number
                createAt: moment().format('YYYY-MM-DD HH:mm:ss')
            };

            console.log('[InstructorController.createCourse] Attempting to create course with data:', newCourseData);
            const newCourseId = await courseService.createCourse(newCourseData);
            console.log('[InstructorController.createCourse] Course created successfully. New course ID:', newCourseId, 'Type:', typeof newCourseId, 'Is BigInt:', typeof newCourseId === 'bigint');

            req.flash('success', 'Course created successfully! Now add some materials.');
            console.log(`[InstructorController.createCourse] Preparing to redirect to /instructor/courses/${Number(newCourseId)}/materials/new`);
            return res.redirect(`/instructor/courses/${Number(newCourseId)}/materials/new`);

        } catch (error) {
            console.error('Error creating course:', error);
            req.flash('error', 'Failed to create course: ' + error.message);
            try {
                const categories = await categoryService.getAllCategories();
                return res.render('createCourse', {
                    title: 'Create Course',
                    user: req.session.user,
                    categories,
                    course: req.body,
                    error: req.flash('error'),
                    success: req.flash('success')
                });
            } catch (renderError) {
                console.error('Error fetching categories for re-render after course creation error:', renderError);
                req.flash('error', 'Failed to load form due to data error after course creation attempt.');
                return res.redirect('/instructor/dashboard');
            }
        }
    }

    /**
     * @async
     * @description Renders the form for adding new materials to a specific course.
     * @param {Object} req - The request object containing courseId in params.
     * @param {Object} res - The response object.
     */
    static async showAddMaterialForm(req, res) {
        try {
            const courseId = Number(req.params.courseId); // Convert to Number
            console.log(`[showAddMaterialForm] Received courseId from params: ${req.params.courseId}, converted to: ${courseId} (Type: ${typeof courseId})`);

            if (isNaN(courseId)) {
                console.log('[showAddMaterialForm] Invalid course ID detected (isNaN). Redirecting to dashboard.');
                req.flash('error', 'Invalid course ID provided.');
                return res.redirect('/instructor/dashboard');
            }

            console.log(`[showAddMaterialForm] Attempting to fetch course for ID: ${courseId}`);
            const course = await courseService.getCourseById(courseId);

            if (!course) {
                console.log('[showAddMaterialForm] Course not found. Redirecting to dashboard.');
                req.flash('error', `Course with ID ${courseId} not found.`);
                return res.redirect('/instructor/dashboard');
            }
            console.log('[showAddMaterialForm] Course fetched successfully:', course);

            // Authorization check: Ensure the logged-in instructor owns this course
            const userId = req.session.user.userId;
            console.log(`[showAddMaterialForm] Checking authorization for userId: ${userId}`);
            const instructorProfile = await instructorService.getInstructorByUserId(userId);

            console.log('[showAddMaterialForm] Fetched instructor profile:', instructorProfile);
            console.log('[showAddMaterialForm] Course instructorId:', course.instructorId);

            if (!instructorProfile || instructorProfile.instructorId !== course.instructorId) {
                console.log('[showAddMaterialForm] Authorization failed. Instructor profile missing or IDs do not match. Redirecting to dashboard.');
                req.flash('error', 'You are not authorized to add materials to this course.');
                return res.redirect('/instructor/dashboard');
            }
            console.log('[showAddMaterialForm] Authorization successful.');


            // Define available material types (or fetch from a service/config if dynamic)
            const materialTypes = ['video', 'document', 'link', 'pdf', 'image'];

            console.log('[showAddMaterialForm] Rendering addCourseMaterial.ejs');
            res.render('addCourseMaterial', {
                title: `Add Material to "${course.courseName}"`,
                user: req.session.user,
                course,
                materialTypes,
                error: req.flash('error'),
                success: req.flash('success')
            });
        } catch (error) {
            console.error('Error rendering add material form (Caught in catch block):', error);
            req.flash('error', 'Failed to load material form: ' + error.message);
            res.redirect('/instructor/dashboard');
        }
    }


    /**
     * @async
     * @description Handles the submission of the new course material form.
     * @param {Object} req - The request object containing courseId in params and material data in body.
     * @param {Object} res - The response object.
     */
    static async addMaterial(req, res) {
        try {
            const courseId = Number(req.params.courseId); // Convert to Number
            if (isNaN(courseId)) {
                req.flash('error', 'Invalid course ID provided.');
                return res.redirect('/instructor/dashboard');
            }
            const { title, materialType, filePath } = req.body;

            const course = await courseService.getCourseById(courseId);
            if (!course) {
                req.flash('error', `Course with ID ${courseId} not found.`);
                return res.redirect('/instructor/dashboard');
            }

            // Authorization check: Ensure the logged-in instructor owns this course
            const userId = req.session.user.userId;
            const instructorProfile = await instructorService.getInstructorByUserId(userId);
            if (!instructorProfile || instructorProfile.instructorId !== course.instructorId) {
                req.flash('error', 'You are not authorized to add materials to this course.');
                return res.redirect('/instructor/dashboard');
            }

            const newMaterialData = {
                courseId: courseId, // Already converted to number
                title,
                materialType,
                filePath,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
            };

            const newMaterialId = await courseMaterialService.createCourseMaterial(newMaterialData);
            console.log('[InstructorController.addMaterial] New material ID:', newMaterialId);

            req.flash('success', 'Course material added successfully!');
            res.redirect(`/api/courses/${courseId}/materials`); // Redirect to view all materials for this course
        } catch (error) {
            console.error('Error adding course material:', error);
            req.flash('error', 'Failed to add course material: ' + error.message);
            res.redirect(`/instructor/courses/${req.params.courseId}/materials/new`); // Redirect back to add material form
        }
    }
}

module.exports = {
    InstructorController,
    requireInstructorLogin
};
