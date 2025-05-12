const express = require("express");
const studentController = require("../controllers/studentController");
const {validateStudent, validateStudentId} = require("../validators/student.dto");
const router = express.Router();


router.get('studentView',studentController.loadStudentsView);
router.get('/:id/dashboard', studentController.loadStudentsView);
router.get("/", studentController.getAllStudents);

router.get("/:id", validateStudentId, studentController.getStudentById);
router.get("/studentCourses/:id", validateStudentId, studentController.getStudentCourses);
router.post("/", validateStudent, studentController.createStudent);
router.put("/:id", validateStudentId, validateStudent, studentController.updateStudent);
router.delete("/:id", validateStudentId, studentController.deleteStudent);
router.get("/", studentController.getAllStudents);



module.exports = router;
