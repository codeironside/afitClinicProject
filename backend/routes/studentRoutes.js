const express = require("express");
const router = express.Router();
const {
  registerStudent, 
  getStudent,
  loginStudent,
  updateRecord,
  deleteRecord,
} = require("../controller/studentController");

const { protect } = require("../middleware/authmiddleware");

router.get("/register",protect, registerStudent);
router.post("/login",protect, loginStudent);
router.get("/me", protect, getStudent);
router.put('/:id',protect, updateRecord)
router.delete('/:id',  protect, deleteRecord)
 
module.exports = router;