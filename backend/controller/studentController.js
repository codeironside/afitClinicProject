const date = require("date");
const jwt = require("jsonwebtoken");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const studentDiagnosis = require("../models/studentDiagnosis");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require("method-override");


const { model } = require("mongoose");
const studentLabreport = require("../models/studentLabreport");
// const student = require('../models/student')

//@desc register new student
//@routes GET /api/student
//@access Public
const registerStudent = asyncHandler(async (req, res) => {
  const { role, ...data } = req.staff;
  const {
    name,
    matricNumber,
    YOB,
    bloodGroup,
    genotype,
    phoneNumber,
    disabilities,
    proveOfPayment,
    admissionLetter,
    email,
  } = req.body;
  if (role == "records" || role == "admin") {
    if (!name || !matricNumber || !YOB) {
      res.status(400);
      throw new Error("please add all fields");
    }
    const checkstudent = await Student.findOne({ matricNumber: matricNumber });
    // console.log(matricNumber)
    //hash the password
    //  const salt = await bcrypt.genSalt(10);
    //  const hashedmatricNumber = await bcrypt.hash(matricNumber, salt)
    //check if student exist

    console.log(checkstudent);
    if (
      checkstudent &&
      bcrypt.compare(matricNumber, checktudent.matricNumber)
    ) {
      res.status(400);
      throw new Error("user already exist");
    }

    // const hashedmatricNumber= await bcrypt.hash(matricNumber,salt)

    const student = await Student.create({
      name,
      matricNumber,
      YOB,
      bloodGroup,
      genotype,
      proveOfPayment,
      phoneNumber,
      disabilities,
      admissionLetter,
      email,

      // matricNumber:hashedmatricNumber
    });
    if (student) {
      const todaysDate = new Date();
      const currentYear = todaysDate.getFullYear();
      res.status(201).json({
        _id: student.id,
        name: student.name,
        email: email,
        // age: currentYear - YOB,
        matricNumber: student.matricNumber,
        // token: generateToken(student._id.roles),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

//@desc authenticatenew staff
//@routes GET/api/slogin
//@access Public
const loginStudent = asyncHandler(async (req, res) => {
  const { matricNumber } = req.body;
  //check for user email
  const { role, ...data } = req.staff;

  const student = await Student.findOne({ matricNumber });
  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();
  if (student && bcrypt.compare(matricNumber, student.matricNumber)) {
    if (role == "doctor") {
    }
    res.json({
      // _id:student.id,

      name: student.name,
      matricNumber: student.matricNumber,
      age: currentYear - student.YOB,
      bloodGroup: student.bloodGroup,
      genotype: student.genotype,
      phoneNumber: student.phoneNumber,
      disabilities: student.disabilities,

      // token:generateToken(student._id,student.roles)
    });
    if (role == "admin") {
      res.json({
        // _id:student.id,

        name: student.name,
        matricNumber: student.matricNumber,
        age: currentYear - student.YOB,
        bloodGroup: student.bloodGroup,
        genotype: student.genotype,
        phoneNumber: student.phoneNumber,
        disabilities: student.disabilities,

        // token:generateToken(student._id,student.roles)
      });
    }
    if (roles == "records") {
      res.json({
        // _id:student.id,

        name: student.name,
        matricNumber: student.matricNumber,
        age: currentYear - student.YOB,
        bloodGroup: student.bloodGroup,
        genotype: student.genotype,
        phoneNumber: student.phoneNumber,
        disabilities: student.disabilities,

        // token:generateToken(student._id,student.roles)
      });
    }
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
//@desc get student data
//@routes get/api/staff
//@access Private
const getStudent = asyncHandler(async (req, res) => {
  const { matricNumber } = req.body;

  const aisha = await Student.findOne({ matricNumber: matricNumber });
  if (aisha) {
    res.json(aisha);
  } else {
    throw new message("student not found");
  }

  console.log(req.student.id);
});

//update student record
const updateRecord = asyncHandler(async (req, res) => {
  const { doctor } = req.body;
  // console.log(req.params.proofid)
  const student = await Student.findById(req.params.id);

  if (!student) {
    // res.status(400)
    throw new Error("student record not found ");
  }
  //update schema with mongoose?
  const men = await studentDiagnosis.findByIdAndUpdate(
    req.params.id,
    { doctor: req.body.doctor },
    {
      new: false,
      upsert: true,
    }
  );
  const mens = await studentDiagnosis.findByIdAndUpdate(
    req.params.id,
    {
      diagnosis: req.body.diagnosis,
    },
    { new: true }
  );
  res.status(200).json(men);
  console.log(men);
});
//updating Lab report

//delete student record
const deleteRecord = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  console.log(student);
  if (!student) {
    res.status(400);
    throw new Error("student record not found ");
  }
  await Student.deleteOne({ id: req.params.id });
  res.json({
    message: "record deleted",
  });
});

module.exports = {
  registerStudent,
  loginStudent,
  getStudent,
  updateRecord,
  deleteRecord,
};
