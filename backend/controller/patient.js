const date = require("date");
const path = require("path")
const crypto = require("crypto")
const multer = require("multer");
const bcrypt = require("bcryptjs");;
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const Patient = require("../models/patient");
const methodOverride = require("method-override");
const stafflogger = require("../utils/stafflogger")
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
    password
  } = req.body;
  console.log(sex)
  role="admin"
  if (role == "records" || role == "admin" || role == "superAdmin") {
    if (!firstName || !patientId ||!role1) {
      res.status(400);
      throw new Error("please add all fields");
    }
    const PATIENT = await Patient.findOne({patientId});
    // console.log(matricNumber)
    //hash the password
    
    //check if student exist

    // console.log(PATIENT);
    if (PATIENT)
    {
      res.status(400);
      throw new Error("user already exist");
    }

    // const hashedmatricNumber= await bcrypt.hash(matricNumber,salt)
    if (role1=="nurse"||role1=="doctor"||role1=="records"||role1=="pharmacy"||role1=="admin"||role1=="superAdmin"||role1=="labAttendant"){
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt)
      const patient = await Patient.create({
        firstName: firstName,
        middlename:middlename,
        surname:surname,
        patientId: patientId,
        date:date,
        month:month,
        year:year,
        bloodGroup: bloodGroup,
        genotype: genotype,
        proveOfPayment: proveOfPayment,
        phoneNumber: phoneNumber,
        disabilities: disabilities,
        admissionLetter: admissionLetter,
        employementLetter,
        email:email,
        sex:sex,
        password:hashedpassword
        // matricNumber:hashedmatricNumber
      });
      if (patient) {
        const todaysDate = new Date();
        const currentYear = todaysDate.getFullYear();
        res.status(201).json({
          _id: patient.id,
          name: patient.firstName,
          email: email,
          // age: currentYear - YOB,
          patientId: patientId,
          // token: generateToken(student._id.roles),
        });
        stafflogger.info(`patient created ${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} -done by:${firstname}`);
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }else{
      const patient = await Patient.create({
        firstName: firstName,
        middlename:middlename,
        surname:surname,
        patientId: patientId,
        date:date,
        month:month,
        year:year,
        bloodGroup: bloodGroup,
        genotype: genotype,
        proveOfPayment: proveOfPayment,
        phoneNumber: phoneNumber,
        disabilities: disabilities,
        employementLetter:employementLetter,
        email:email,
        sex:sex,
        
  
        // matricNumber:hashedmatricNumber
      });

      if (patient) {
        const todaysDate = new Date();
        const currentYear = todaysDate.getFullYear();
        res.status(201).json({
          _id: patient.id,
          name: patient.firstName,
          email: email,
          // age: currentYear - YOB,
          patientId: patientId,
          // token: generateToken(student._id.roles),
        });
        stafflogger.info(`patient created ${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} -done by:tobi`);
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      };
    }
    res.status(400);
    throw new Error("not authorized");
 
  }
});

//@desc authenticatenew staff
//@routes GET/api/slogin
//@access Public
const loginPatient = asyncHandler(async (req, res) => {
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
    if (role == "superadmin") {
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
  console.log(matricNumber)

  const studentId = await Student.findOne({ matricNumber: matricNumber });
  const studentRecord = await studentDiagnosis.findOne({_id:studentId})
  if (studentId) {
    if(studentRecord){
      res.status(200).json(studentRecord)
    };
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
  registerPatient,
 
};
