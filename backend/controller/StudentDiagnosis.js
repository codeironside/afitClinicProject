const date = require("date");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const studentDiagnosis = require("../models/studentDiagnosis");
const { ObjectId } = require("mongodb");

//inssert new records
const studentdiagnosis = asyncHandler(async (req, res) => {
  const { matricNumber, doctor, prescribtions, diagnosis, ailment } = req.body;
  
  const { role, ...data } = req.staff;
  if (role == "doctor") {
    // console.log(req.params.proofid)
    const student = await Student.findOne({ matricNumber: matricNumber });
    // console.log(student)

    if (!student) {
      // res.status(400)
      throw new Error("student record not found ");
    }
    //update schema with mongoose?
    const studentDiagnosed = await studentDiagnosis.create({
      studentId: student.id,
      doctor: doctor,
      prescribtions: prescribtions,
      diagnosis: diagnosis,
      ailment: ailment,
      Date: new Date(),
    });
    //date in javascript?

    res.status(200).json(studentDiagnosed);
  }else{
    res.status(403).json({
      message:'unauthorized access'
    })
  }
});
module.exports = studentdiagnosis;
