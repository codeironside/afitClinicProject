const express = require("express");
const router = express.Router();
const {
  registerStudent, 
  getStudent,
  loginStudent,
  updateRecord,
  deleteRecord,

} = require("../controller/studentController");
const {studentdiagnosis, diagnosisData, prescribtion} = require('../controller/StudentDiagnosis');
const { ClinicalReport, MicroBiology } = require("../controller/Studentlabreport");

const { protect } = require("../middleware/authmiddleware");

router.post("/register",protect, registerStudent);
router.post("/login",protect, loginStudent);
// router.get("/me", protect, getStudent);
router.get("/me", protect, loginStudent);

router.delete('/:id',  protect, deleteRecord)
router.put('/:id',protect, updateRecord)
router.post('/diagnosed/:id',protect, studentdiagnosis)
router.post('/prescribtions',protect, prescribtion)
router.get("/data",diagnosisData)
router.route("/ClinicalReport").post(ClinicalReport)
router.route("/MicroBiology").post(protect,MicroBiology)
 
module.exports = router;