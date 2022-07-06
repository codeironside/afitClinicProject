
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require('express-async-handler')
const Student=require('../models/student')
const Staff=require('../models/staff')
const Drug=require('../models/drugs')
// const student = require('../models/student')

//@desc upload new drugs
//@routes POST/api/staff
//@access Public

const registerNewdrug =asyncHandler(async(req,res)=>{
    const{roles,DrugName,
        batchNumber,
        NafdacNumber,
        expirydate,
        CurrentQuantity,
        totalquantity}= req.body
    if(roles !== "records" || !roles){
        res.status(400)
        throw new Error('not an authorized user')
    }
    //check if student exist
    const batchNumbers = await Drug.findOne({batchNumber})
    if(batchNumbers){
        res.status(400)
        throw new Error('this batch of drugs already exist')
    }
    //hash the password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword= await bcrypt.hash(password,salt)

    const drug = await Drug.create({
        DrugName,
        batchNumber,
        NafdacNumber,
        expirydate,
        CurrentQuantity,
        totalquantity



    })
    if(drug){
        res.status(201).json({
            _id:drug.id,
            DrugName:drug.DrugName,
            batchNumber:drug.batchNumber,
            NafdacNumber:drug.NafdacNumber,
            expiryDate:drug.expiryDate,
            totalquantity:drug.totalquantity,
            currentQuantity:drug.currentQuantity


            // token:generateToken(student._id.roles)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

   
})


module.exports= {
    registerNewdrug
}