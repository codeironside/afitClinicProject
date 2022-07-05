
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require('express-async-handler')
const Student=require('../models/student')
const Staff=require('../models/staff')
// const student = require('../models/student')

//@desc upload new drugs
//@routes POST/api/staff
//@access Public
const registerNewdrug =asyncHandler(async(req,res)=>{
    const{roles, batchNumbers}= req.body
    if(roles !== "pharmacy" || !roles){
        res.status(400)
        throw new Error('not an authorized user')
    }
    //check if student exist
    const batchNumber = await Student.findOne({batchNumbers})
    if(batchNumber){
        res.status(400)
        throw new Error('this batch of drugs already exist')
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)

    const student = await Student.create({
        name,
        email,
        password:hashedPassword
    })
    if(student){
        res.status(201).json({
            _id:student.id,
            name:student.name,
            email:student.email,
            token:generateToken(student._id.roles)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

   
})


module.exports= {
    registerNewdrug
}