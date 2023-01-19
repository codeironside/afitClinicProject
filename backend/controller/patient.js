const date = require("date");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const Patient = require("../models/patient");
const methodOverride = require("method-override");
const stafflogs = require("../utils/stafflogs");
const asyncHandler = require("express-async-handler");
const GridFsStorage = require("multer-gridfs-storage");
const studentDiagnosis = require("../models/studentDiagnosis");

//TODO :read about socletio
const { model } = require("mongoose");

// const student = require('../models/student')

//@desc register new spatient
//@routes GET /api/patient
//@access Public
const registerPatient = asyncHandler(async (req, res) => {
  // const { role,firsname, ...data } = req.staff;
  const {
    sex,
    firstName,
    middlename,
    surname,
    patientId,
    date,
    month,
    year,
    role1,
    bloodGroup,
    genotype,
    phoneNumber,
    disabilities,
    proveOfPayment,
    admissionLetter,
    email,
    employementLetter,
    password,
  } = req.body;
  const role = "admin";
  if (role == "records" || role == "admin" || role == "superAdmin") {
    if (!firstName && !patientId && role1) {
      res.status(400);
      throw new Error("please add all fields");
    }
    const PATIENT = await Patient.findOne({ patientId });
    // console.log(matricNumber)
    //hash the password

    //check if student exist

    // console.log(PATIENT);
    if (PATIENT) {
      res.status(400);
      throw new Error("user already exist");
    }

    // const hashedmatricNumber= await bcrypt.hash(matricNumber,salt)
    //TODO:remove super admin when pushing to production
    if (
      role1 === "nurse" ||
      role1 === "doctor" ||
      role1 === "records" ||
      role1 === "pharmacist" ||
      role1 === "admin" ||
      role1 === "superAdmin" ||
      role1 === "labAttendant"
    ) {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      const patient = await Patient.create({
        firstName: firstName,
        middlename: middlename,
        surname: surname,
        patientId: patientId,
        date: date,
        month: month,
        year: year,
        bloodGroup: bloodGroup,
        genotype: genotype,
        proveOfPayment: proveOfPayment,
        phoneNumber: phoneNumber,
        disabilities: disabilities,
        admissionLetter: admissionLetter,
        employementLetter,
        email: email,
        sex: sex,
        password: hashedpassword,
        role: role1,
        // matricNumber:hashedmatricNumber
      });
      if (patient) {
        const todaysDate = new Date();
        const currentYear = todaysDate.getFullYear();
        res.status(200).json({
          id: patient.id,
          name: patient.firstName,
          email: email,
          // age: currentYear - YOB,
          "your ID": patientId,

          // token: generateToken(student._id.roles),
        });
        stafflogs.info(
          `  patient with patientid: ${patientId} created coode:${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
        );
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } else {
      const patient = await Patient.create({
        firstName: firstName,
        middlename: middlename,
        surname: surname,
        patientId: patientId,
        date: date,
        month: month,
        year: year,
        bloodGroup: bloodGroup,
        genotype: genotype,
        proveOfPayment: proveOfPayment,
        phoneNumber: phoneNumber,
        disabilities: disabilities,
        employementLetter: employementLetter,
        email: email,
        sex: sex,

        // matricNumber:hashedmatricNumber
      });

      if (patient) {
        const todaysDate = new Date();
        const currentYear = todaysDate.getFullYear();
        res.status(202).json({
          id: patient._id,
          name: patient.firstName,
          email: email,
          // age: currentYear - YOB,
          "Your Id": patientId,
          // token: generateToken(student._id.roles),
        });
        stafflogs.info(
          `  patient with patientid: ${patientId} created coode:200 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
        );
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } else {
    res.status(403);
    throw new Error("not authorized");
  }
});

//@desc login patient
//@routes GET/api/slogin
//@access Public

const loginPatient = asyncHandler(async (req, res) => {
  console.log("messgae:welcome to the login page");
});

//@desc login staff
//@routes GET/api/slogin
//@access Public
const loginSTAFF = asyncHandler(async (req, res) => {
  const { patientId, password } = req.body;
  //check for user email
  // const { role, ...data } = req.staff;

  const patient = await Patient.findOne({ patientId });
  if (patient && patient && bcrypt.compare(password, patient.password)) {

    if (patient.role === "superAdmin") {
      const cursor = await Patient.find({});
      // const cursor =await Patient.find({}).select(["patientId","firstName", "admitted"])

      res.status(200).json(cursor);


    }
    if (patient.role === "admin") {
      const cursor = await Patient.find({ role: { $in: ["patient"] } }).select([
        "patientId",
        "firstName",
        "admitted",
        "role",
      ]);
      // const cursor =await Patient.find({}).select(["patientId","firstName", "admitted"])

      res.status(200).json(cursor);

      stafflogs.info(
        `  patient(staff) with patientid: ${patientId} logged in code:200 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
      );
    }
    if (patient.role === "doctor") {
      res.status(200).json({
        role:patient.role
      })
      stafflogs.info(
        `  patient(staff) with patientid: ${patientId} logged in code:200 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
      );
    }
  } else {
    res.status(401);
    throw new Error("invalid Crednetials");
  }
});

//@desc get student data
//@routes get/api/staff
//@access Private
const getStudent = asyncHandler(async (req, res) => {
  const { matricNumber } = req.body;
  console.log(matricNumber);

  const studentId = await Student.findOne({ matricNumber: matricNumber });
  const studentRecord = await studentDiagnosis.findOne({ _id: studentId });
  if (studentId) {
    if (studentRecord) {
      res.status(200).json(studentRecord);
    }
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

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
module.exports = {
  registerPatient,
  loginPatient,
  loginSTAFF,
};
