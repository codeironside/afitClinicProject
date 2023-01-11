const express = require("express");
const router = express.Router();
const {
  registerPatient, 
 

} = require("../controller/patient");
const {studentdiagnosis, diagnosisData, prescribtion} = require('../controller/StudentDiagnosis');
const { ClinicalReport, MicroBiology } = require("../controller/Studentlabreport");

const { protect } = require("../middleware/authmiddleware");

router.route("/register").post( registerPatient);
// router.post("/login",protect, loginStudent);
// // router.get("/me", protect, getStudent);
// router.get("/me", protect, loginStudent);

// router.delete('/:id',  protect, deleteRecord)
// router.put('/:id',protect, updateRecord)
// router.post('/diagnosed/:id',protect, studentdiagnosis)
// router.post('/prescribtions',protect, prescribtion)
// router.get("/data",diagnosisData)
// router.route("/ClinicalReport").post(protect,ClinicalReport)
// router.route("/MicroBiology").post(protect,MicroBiology)
 
module.exports = router;