const instructorService = require('../services/instructorService');
const Instructor = require('../models/instructorModel');

/**
 * @class InstructorController
 * @description This class handles operations related to instructors, 
 * including retrieving, creating, updating, and deleting instructor data.
 */

class InstructorController {

  /**
   * @async
   * @description Retrieves all instructors from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the list of all instructors.
   */

 static async getAllInstructors(req, res) {
        try {
            const instructors = await instructorService.getInstructors();
          return  res.status(200).json(instructors);
        } catch (error) {
         return   res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Retrieves a specific instructor by their unique ID.
   * @param {Object} req - The request object containing the instructor ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the instructor data.
   */

 static async getInstructorById(req, res) {
        try {
            const {id}= req.params;
           
            const instructor = await instructorService.getInstructorById(id);
            /*
            if (!instructor) {
                return res.status(404).json({ message: 'Instructor not found' });
            }*/
           return res.status(200).json(instructor);
        } catch (error) {
          return  res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Creates a new instructor in the database.
   * @param {Object} req - The request object containing the instructor 
   * data (userId, insFName, insLName, bio, profilePicture).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the created instructor.
   */

 static async createInstructor(req, res) {
        try {
            const {userId, insFName, insLName , bio, profilePicture} = req.body;
            
               let instructor = new Instructor(0,userId, insFName, insLName , bio, profilePicture);
            const newInstructor = await instructorService.createInstructor(instructor);
          return  res.status(201).json({message:`instructor created successufly`,instructor:newInstructor});
        } catch (error) {
          return  res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Updates an existing instructor by their unique ID.
   * @param {Object} req - The request object containing the instructor ID in the 
   * params and updated data in the body (userId, insFName, insLName, bio, profilePicture).
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with the updated instructor data.
   */

 static async updateInstructor(req, res) {
        try {
            const {id}=req.params;
            const {userId, insFName, insLName , bio, profilePicture} = req.body;
            let instructor = new Instructor(id,userId, insFName, insLName , bio, profilePicture)
            const updatedInstructor = await instructorService.updateInstructor(instructor);
           
          return  res.status(200).json({message:`instructor updated successufly`,instructor:updatedInstructor});
        } catch (error) {
          return  res.status(500).json({ message: error.message });
        }
    }

  /**
   * @async
   * @description Deletes an instructor by their unique ID.
   * @param {Object} req - The request object containing the instructor ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message.
   */

  static async deleteInstructor(req, res) {
        try {
            const {id}=req.params;
           
            const deletedInstructor = await instructorService.deleteInstructor(id);
          
           return res.status(200).json({ message: 'Instructor deleted successfully' });
        } catch (error) {
          return  res.status(500).json({ message: error.message });
        }
    }
  
  /**
   * @async
   * @description Retrieves all courses associated with a specific instructor.
   * @param {Object} req - The request object containing the instructor ID in the params.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response containing the list of instructor courses.
   */

    static async getInstructorCourses(req,res){
      try{
        const {id}= req.params;
       
        const courses = await instructorService.getInstruvtorCourses(id);
        return res.status(200).json({message:`the instructor courses`,instructorCourses:courses})
      }catch(error){
        return res.status(500).json({message :error.message});
      }
    
}

static async showInstructorForm(req, res) {
    try {
        res.render('instructorView.ejs');
    } catch (error) {
        console.error('Error fetching instructor form:', error);
        res.status(500).send('Internal Server Error');
    }
  }

  static async loadInstructorCourses(req, res) {
    try {
        const { id } = req.params;
        const courses = await instructorService.getInstruvtorCourses(id);
        res.render('instructorCourses.ejs', { courses });
    } catch (error) {
        console.error('Error loading instructor courses:', error);
        res.status(500).send('Internal Server Error');
    }
  }
}
module.exports = InstructorController;