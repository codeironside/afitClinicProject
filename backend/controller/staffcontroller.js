// const bodyparconst bodyparser= require('body-parser')
// const {check, validationResult}=require('express-validator')
// const bodyParser = require('body-parser')
const url = require("url")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require('express-async-handler')
const Staff=require('../models/staff')
// const student = require('../models/student')
const aboutClinic= asyncHandler(async(req,res)=>{
    res.render("index")
    
})



const Clinicservices=asyncHandler(async(req, res)=>{
    res.render("services")
})
//@desc register new staff 
//@routes POST/api/staff
//@access Public
const registerStaff =asyncHandler(async(req,res)=>{
    const{name, role, StaffNumber}= req.body
    console.log(req.body)
    if(!name||!role||!StaffNumber){
        res.status(400)
        throw new Error('please add all fields')
        if(roles !== "admin" || !roles){
            res.status(400)
            throw new Error('not an authorized user')
        }
    }
    //check if student exist
    const staffExists = await Staff.findOne({StaffNumber})
    if(staffExists){
        res.status(400)
        throw new Error('user already exist')
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    // const hashedmatricNumber= await bcrypt.hash(matricNumber,salt)

    const staff = await Staff.create({
        name,
       role,
       StaffNumber

        // matricNumber:hashedmatricNumber
        
    })
    if(StaffNumber){
        const todaysDate = new Date()
        const currentYear = todaysDate.getFullYear()
        res.status(201).json({
            _id:staff.id,
            name:staff.name,
            StaffNumber:staff.StaffNumber,
            token:generateToken(staff._id.roles)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

   
})

//@desc authenticatenew staff 
//@routes GET/api/slogin
//@access Public
const loginStaff =asyncHandler(async(req,res)=>{
    const err = req.query.err
    res.render('login', {err: err})
    
  
})
const loginStaffs = asyncHandler(async(req,res)=>{
    const staffNumber = req.body.staffNumber
    console.log(staffNumber)    
    //check for staff number
    const staff =await Staff.findOne({StaffNumber:staffNumber})
    if(req.body.staffNumber == staff.StaffNumber){
        // prescribtions()
        var staffname= staff.name
        // return {staffname: staffname}
        
        res.redirect(url.format({
            pathname:"/doctors",
            query: {
               staffname:staffname
             }
          }));
        // res.json({

        //     //rendering static file
            
        //         // _id:student.id,
                
                


        //         // token:generateToken(student._id,student.roles)
        // })
    }else{
        // res.status(400)
        // throw new Error('Invalid credentials')
        // alert('Invalid Credentials')
        req.body.staffNumber = null
        res.redirect(url.format({
            pathname:"/login",
            query: {
               err:"Invalid credentials"
             }
          }));
    }
    
})

// desc doctors routing here
// 2@routes internally from the form
//@access private
const prescribtions = asyncHandler(async(req,res)=>{
    var staffname = req.query.staffname;
    res.render('doctors', {name:staffname})
})
//@desc get student data 
//@routes get/api/staff
//@access Private
const getStudent =asyncHandler(async(req,res)=>{
    const {_id, name, email}=await Student.findById(req.student.id)
    console.log(req.student.id)

    res.status(200).json({
        id:_id,
        name,
        email
    })
})
//generate jwt
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"5y"})
}
module.exports= {
    registerStaff,
    loginStaff,
    aboutClinic,
    loginStaffs,
    prescribtions,
    Clinicservices
}