// const bodyparconst bodyparser= require('body-parser')
// const {check, validationResult}=require('express-validator')
// const bodyParser = require('body-parser')
const url = require("url");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Staff = require("../models/staff");
// const student = require('../models/student')
const aboutClinic = asyncHandler(async (req, res) => {
  res.render("index");
});

const Clinicservices = asyncHandler(async (req, res) => {
  res.render("services");
});
//@desc register new staff
//@routes POST/api/staff
//@access Public
//updating mongoose with javascript?
const registerStaff = asyncHandler(async (req, res) => {
  const {
    email,
    role,
    name,
    StaffNumber,
    YOB,
    bloodGroup,
    genotype,
    phoneNumber,
    disabilities,
    gender,
    password,
  } = req.body;
  console.log(req.body);
  if (
    !name ||
    !password ||
    !StaffNumber ||
    !gender ||
    !YOB ||
    !bloodGroup ||
    !genotype ||
    !phoneNumber ||
    !disabilities
    ||!role
    ||!email
  ) {
    res.status(400);
    throw new Error("please add all fields");
    if (roles !== "admin" || !roles) {
      res.status(400);
      throw new Error("not an authorized user");
    }
  }
  //check if staff exist
  const staffExists = await Staff.findOne({ StaffNumber });
  if (staffExists) {
    res.status(400);
    throw new Error("user already exist");
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // const user = {
  //   id: staff.id, 
  //   username: staff.role,
   
  // }
  //creat staff
  const staff = await Staff.create({
    name,
    StaffNumber,
    YOB,
    bloodGroup,
    genotype,
    phoneNumber,
    disabilities,
    gender,
    role,
    email,
    password: hashedPassword,
    
  });
  if (staff) {
    res.status(201).json({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      role:staff.role,
      token: generateToken(staff._id,role),
    });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
  // if (StaffNumber) {
  //   const todaysDate = new Date();
  //   const currentYear = todaysDate.getFullYear();
  //   res.status(201).json({
  //     _id: staff.id,
  //     name: staff.name,
  //     StaffNumber: staff.StaffNumber,
  //     token: generateToken(staff._id.roles),
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid user data");
  // }
});

//@desc authenticate a staff
//@routes GET/api/slogin
//@access Public
const loginStaffs = asyncHandler(async (req, res) => {
  const err = req.query.err;
  res.render("login", { err: err });
});
const loginStaff = asyncHandler(async (req, res) => {
  const { StaffNumber, password } = req.body;

  //check for staff number
  const staff = await Staff.findOne({ StaffNumber: StaffNumber });
  if (staff && bcrypt.compare(password, staff.password)) {
  
    res.status(201).json({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      token: generateToken(staff.id),
      role:staff.role,
    });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
});

// desc doctors routing here
// 2@routes internally from the form
//@access private
const prescribtions = asyncHandler(async (req, res) => {
  var staffname = req.query.staffname;
  res.render("doctors", { name: staffname });
});
//@desc get student data
//@routes get/api/staff
//@access Private
const getStaff = asyncHandler(async (req, res) => {
  console.log(req.staff)
  const { _id, name, email, role} = await Staff.findById(req.staff.id);
  // console.log(req.student.id);
console.log(req.staff)
  res.status(200).json({
    id: _id,
    name,
    email,
    role
    
  });

})
//generate jwt
const generateToken = (id) => {
  return jwt.sign({ id}, process.env.JWT_SECRET, { expiresIn: "1d" });
};
module.exports = {
  registerStaff,
  loginStaff,
  aboutClinic,
  loginStaffs,
  prescribtions,
  Clinicservices,
  getStaff 
};
