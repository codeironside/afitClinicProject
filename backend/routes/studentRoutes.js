const express = require("express");
const router = express.Router();
const {
  registerStudent, 
  getStudent,
  loginStudent,
  updateRecord,
  deleteRecord,
  diagnosis,

} = require("../controller/studentController");

const { protect } = require("../middleware/authmiddleware");

router.post("/register",protect, registerStudent);
router.post("/login",protect, loginStudent);
router.get("/me", protect, getStudent);

router.delete('/:id',  protect, deleteRecord)
router.put('/:id',protect, updateRecord)
router.post('/diagnosed/:id',protect, diagnosis)
 
module.exports = router;