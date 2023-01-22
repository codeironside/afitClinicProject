const express = require("express");
const router = express.Router();
const {
  registerPatient,
  loginPatient,
  loginSTAFF,
} = require("../controller/patient/patient");
const {
  studentdiagnosis,
  diagnosisData,

  patientdiagnosis,
} = require("../controller/doctor/patientDiagnosis");
const {
  ClinicalReport,
  MicroBiology,
} = require("../controller/labattendant/Studentlabreport");

const { protect } = require("../middleware/authmiddleware");
const { prescribtions } = require("../controller/doctor/patientPrescribtion");

router.route("/register").post(registerPatient);
router.route("/login").get(loginPatient);

router.route("/login").post(loginSTAFF);

// router.post("/login",protect, loginStudent);
// // router.get("/me", protect, getStudent);
// router.get("/me", protect, loginStudent);

// router.delete('/:id',  protect, deleteRecord)
// router.put('/:id',protect, updateRecord)
router.route("/diagnosis").post(protect, patientdiagnosis);
// router.post('/prescribtions',protect, prescribtion)
router.route("/data").get(protect, diagnosisData);

router.route("/prescribtion").post(protect, prescribtions)
// router.route("/ClinicalReport").post(protect,ClinicalReport)
// router.route("/MicroBiology").post(protect,MicroBiology)

module.exports = router;
