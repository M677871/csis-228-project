const quizResultRepository = require('../repositories/quizResultRepository');
const quizRepository = require('../repositories/quizRepository');
const studentRepository = require('../repositories/studentRepository');

class QuizResultService {
    static async getAllQuizResults() {
        try {
        const quizResults = await quizResultRepository.getAllQuizResults();
        return quizResults;
        } catch (error) {
        throw new Error('Error fetching quiz results: ' + error.message);
        }
    }
    static async getQuizResultById(id) {
        try {
        if (!(await quizResultRepository.quizResultExists(id))) {
            throw new Error(`Quiz Result ID: ${id} does not exist`);
        }
        const quizResult = await quizResultRepository.getQuizResultById(id);
        return quizResult;
        } catch (error) {
        throw new Error('Error fetching quiz result: ' + error.message);
        }
    }
    static async createQuizResult(quizResult) {
        try {
        if(await quizResultRepository.quizResultExistByStudentIdandQuizId(quizResult.studentId,quizResult.quizId)){
        throw new Error(`Quiz Result already exists for student ID: ${quizResult.studentId} and quiz ID: ${quizResult.quizId}`);
            }
if (!(await quizRepository.quizExists(quizResult.quizId))) {
            throw new Error(`Quiz ID: ${quizResult.quizId} does not exist`);
        }
        if (!(await studentRepository.studentExists(quizResult.studentId))) {
            throw new Error(`Student ID: ${quizResult.studentId} does not exist`);
        }

        const newQuizResult = await quizResultRepository.createQuizResult(quizResult);
        return newQuizResult;
        } catch (error) {
        throw new Error('Error creating quiz result: ' + error.message);
        }
    }
    static async updateQuizResult(quizResultData) {
        try {
        if (!(await quizResultRepository.quizResultExists(quizResultData.resultId))) {
            throw new Error(`Quiz Result ID: ${quizResultData.resultId} does not exist`);
        }
        if (!(await quizRepository.quizExists(quizResultData.quizId))) {
            throw new Error(`Quiz ID: ${quizResultData.quizId} does not exist`);
        }
        if (!(await studentRepository.studentExists(quizResultData.studentId))) {
            throw new Error(`Student ID: ${quizResultData.studentId} does not exist`);
        }
        const updatedQuizResult = await quizResultRepository.updateQuizResult(quizResultData);
        return updatedQuizResult;
        } catch (error) {
        throw new Error('Error updating quiz result: ' + error.message);
        }
    }
    static async deleteQuizResult(id) {
        try{
            if (!(await quizResultRepository.quizResultExists(id))) {
                throw new Error(`Quiz Result ID: ${id} does not exist`);
            }
            await quizResultRepository.deleteQuizResult(id);
        }
        catch (error) {
            throw new Error('Error deleting quiz result: ' + error.message);
        }
    }
}
module.exports = QuizResultService;