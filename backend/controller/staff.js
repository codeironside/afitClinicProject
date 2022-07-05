const Clinic = require('../models/staff')

const asyncHandler = require("express-async-handler")

//@desc Get goals 
//@routes Get/api/goals
//@access Private
const getGoals = asyncHandler(async(req,res)=>{
    const clinics = await Clinic.find({clinic : req.student.id})
    res.status(200).json(clinics)
})

//@desc Set goal 
//@routes POsT/api/goals
//@access Private
const setGoal = asyncHandler(async(req,res)=>{
    //if(!req.body.name){
      //  res.status(400)
      //  throw new Error("please add a text field")
    //}
    const clinic = await Clinic.create({
        name: req.body.name,
        role: req.body.role,
        matricNumber: req.body.matricNumber
    })
    res.status(200).json({ clinic  }) 
})
//@desc Update goal 
//@routes put/api/goals/:id
//@access Private
const updateGoal = asyncHandler(async(req,res)=>{
    const clinic = await Clinic.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("user not found ")
    }
    const updatedGoal = await Clinic.findByIDandUpdate(req.params.id, req.body,{new: true})
    res.status(200).json(updatedGoal)
})
//@desc Delete goals 
//@routes Get/api/goals/:id
//@access Private
const deleteGoal =asyncHandler( async(req,res)=>{

    const clinic = await Clinic.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("user not found ")
    }

    await clinic.remove()
    res.status(200).json({id: req.params.id})
})

module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}