const express = require("express");
const router = express.Router();
const {
  registerStudent, 
  getStudent,
  loginStudent,
  updateRecord,
  deleteRecord,

} = require("../controller/studentController");
const studentdiagnosis = require('../controller/StudentDiagnosis')

const { protect } = require("../middleware/authmiddleware");

router.post("/register",protect, registerStudent);
router.post("/login",protect, loginStudent);
// router.get("/me", protect, getStudent);
router.get("/me", protect, loginStudent);

router.delete('/:id',  protect, deleteRecord)
router.put('/:id',protect, updateRecord)
router.post('/diagnosed/:id',protect, studentdiagnosis)
 
module.exports = router;