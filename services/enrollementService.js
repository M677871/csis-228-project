const enrollementRepository = require('../repositories/enrollementRepository');
const studentRepository = require('../repositories/studentRepository');
const courseRepository = require('../repositories/courseRepository');

class enrollementService{

    static async getAllEnrollements(){
        try{
            const enrollements = await enrollementRepository.getAllEnrollements();
            return enrollements;
        }catch(error){
            throw new Error('Error fetching enrollements: ' + error.message);
        }
    }
    static async getEnrollementById(id){
        try{
            
            if(!(await enrollementRepository.isEnrollementExists(id))){
                throw new Error(`Enrollement ID: ${id} does not exist`);
            }
            const enrollement = await enrollementRepository.getEnrollementById(id);
            return enrollement;
        }catch(error){
            throw new Error('Error fetching enrollement: ' + error.message);
        }
    }
    static async createEnrollement(enrollement){
        try{
            if((await enrollementRepository.getEnrollmentByStudentAndCourse(enrollement.studentId, enrollement.courseId))){
                throw new Error(`Enrollement already exists`);
            }
            if(!(await studentRepository.studentExists(enrollement.studentId))){
                throw new Error(`Student ID: ${enrollement.studentId} does not exist`);
            }
            if(!(await courseRepository.courseExistsById(enrollement.courseId))){
                throw new Error(`Course ID: ${enrollement.courseId} does not exist`);
            }

            const newEnrollement = await enrollementRepository.createEnrollement(enrollement);
            return newEnrollement;
        }catch(error){
            throw new Error('Error creating enrollement: ' + error.message);
        }
    }
    static async updateEnrollement(enrollementData){
        try{
            
            if(!(await enrollementRepository.isEnrollementExists(enrollementData.enrollementId))){
                throw new Error(`Enrollement ID: ${enrollementData.enrollementId} does not exist`);
            }
            if((await enrollementRepository.getEnrollmentByStudentAndCourse(enrollementData.studentId, enrollementData.courseId))){
                throw new Error(`Enrollement with student ID: ${enrollementData.studentId} and course ID: ${enrollementData.courseId} already exists`);
            }
            
            if(!(await studentRepository.studentExists(enrollementData.studentId))){
                throw new Error(`Student ID: ${enrollementData.studentId} does not exist`);
            }
            if(!(await courseRepository.courseExistsById(enrollementData.courseId))){
                throw new Error(`Course ID: ${enrollementData.courseId} does not exist`);
            }


            const updatedEnrollement = await enrollementRepository.updateEnrollement(enrollementData);
            return updatedEnrollement;
        }catch(error){
            console.log(error);
            throw new Error('Error updating enrollement: ' + error.message);
        }
    }
    static async deleteEnrollement(id){
        try{
            
            if(!(await enrollementRepository.isEnrollementExists(id))){
                throw new Error(`Enrollement ID: ${id} does not exist`);
            }
            await enrollementRepository.deleteEnrollement(id);
        }catch(error){
            throw new Error('Error deleting enrollement: ' + error.message);
        }
    }
}
module.exports = enrollementService;