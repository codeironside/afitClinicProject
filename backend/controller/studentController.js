const date = require('date')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require('express-async-handler')
const Student=require('../models/student')
// const student = require('../models/student')

//@desc register new student 
//@routes POST/api/staff
//@access Public
const registerStudent =asyncHandler(async(req,res)=>{
    const{name,matricNumber,YOB,bloodGroup,genotype,phoneNumber,disabilities}= req.body
    if(!name||!matricNumber||!YOB){
        res.status(400)
        throw new Error('please add all fields')
    }
    //check if student exist
    const studentExists = await Student.findOne({matricNumber})
    if(studentExists){
        res.status(400)
        throw new Error('user already exist')
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    // const hashedmatricNumber= await bcrypt.hash(matricNumber,salt)

    const student = await Student.create({
        name,
       matricNumber,
       YOB,
       bloodGroup,
       genotype,
       phoneNumber,
       disabilities

        // matricNumber:hashedmatricNumber
        
    })
    if(student){
        const todaysDate = new Date()
        const currentYear = todaysDate.getFullYear()
        res.status(201).json({
            _id:student.id,
            name:student.name,
            age: currentYear - YOB,
            matricNumber:student.matricNumber,
            token:generateToken(student._id.roles)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

   
})


//@desc authenticatenew staff 
//@routes GET/api/slogin
//@access Public
const loginStudent =asyncHandler(async(req,res)=>{
    const {matricNumber} = req.body    
    //check for user email
    const student =await Student.findOne({matricNumber})
    const todaysDate = new Date()
    const currentYear = todaysDate.getFullYear()
    if(student){
        res.json({
                // _id:student.id,
                
                name:student.name,
                matricNumber:student.matricNumber,
                age: currentYear - student.YOB,
                bloodGroup:student.bloodGroup,
                genotype:student.genotype,
                phoneNumber:student.phoneNumber,
                disabilities:student.disabilities

                // token:generateToken(student._id,student.roles)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

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
    registerStudent,
    loginStudent,
    getStudent,
}