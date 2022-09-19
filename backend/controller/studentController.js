const date = require("date");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
// const student = require('../models/student')

//@desc register new student
//@routes GET /api/student
//@access Public
const registerStudent = asyncHandler(async (req, res) => {
  const {
    name,
    matricNumber,
    YOB,
    bloodGroup,
    genotype,
    phoneNumber,
    disabilities,
  } = req.body;
  if (!name || !matricNumber || !YOB) {
    res.status(400);
    throw new Error("please add all fields");
  }
  const loginStudent = await Student.findOne({  matricNumber:matricNumber});
  // console.log(matricNumber)
   //hash the password
  //  const salt = await bcrypt.genSalt(10);
  //  const hashedmatricNumber = await bcrypt.hash(matricNumber, salt)
  //check if student exist
  
  
  console.log(loginStudent)
  if (loginStudent && bcrypt.compare(matricNumber, loginStudent.matricNumber))  {
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
    phoneNumber,
    disabilities,

    // matricNumber:hashedmatricNumber
  });
  if (student) {
    const todaysDate = new Date();
    const currentYear = todaysDate.getFullYear();
    res.status(201).json({
      _id: student.id,
      name: student.name,
      // age: currentYear - YOB,
      matricNumber: student.matricNumber,
      // token: generateToken(student._id.roles),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc authenticatenew staff
//@routes GET/api/slogin
//@access Public
const loginStudent = asyncHandler(async (req, res) => {
  const { matricNumber } = req.body;
  //check for user email

  const student = await Student.findOne({ matricNumber });
  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();
  if (student && bcrypt.compare(password, student.matricNumber)) {
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
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
//@desc get student data
//@routes get/api/staff
//@access Private
const getStudent = asyncHandler(async (req, res) => {
 //res.json?
res.json(null);
res.json({ user: 'tobi' });
res.status(500).json({ error: 'message' });




  console.log(req.student.id);
});

//update student record
const updateRecord = asyncHandler(async (req, res) => {
  
 const student = await Student.findById(req.params.id)
 if(!student){
  res.status(400)
  throw new Error('student record not found ')
 }
 const updatedRecord= await Student.findByIdAndUpdate(req.params.id, req.body,{
  new:true
 })
})
//delete student record
const deleteRecord = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
  console.log(student)
  if(!student){
   res.status(400)
   throw new Error('student record not found ')
   
  }
  await Student.remove({id:req.params.id});
  res.json({
    message:"record deleted"
  })
  
})


module.exports = {
  registerStudent,
  loginStudent,
  getStudent,
  updateRecord,
  deleteRecord
};
