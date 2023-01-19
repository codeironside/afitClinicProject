const express = require("express");
const router = express.Router();
const {
  registerPatient, loginPatient, loginSTAFF
 

} = require("../controller/patient");
const {studentdiagnosis, diagnosisData, prescribtion} = require('../controller/StudentDiagnosis');
const { ClinicalReport, MicroBiology } = require("../controller/Studentlabreport");

const { protect } = require("../middleware/authmiddleware");

router.route("/registerAdmin").post( registerPatient);


router.route("/loginAmin").post(loginSTAFF)

router.route("/login").post(loginAdmin)

module.exports = router;