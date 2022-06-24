const asyncHandler = require("express-async-handler")

//@desc Get goals 
//@routes Get/api/goals
//@access Private
const getGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"Get goals"
    }) 
})

//@desc Set goal 
//@routes POsT/api/goals
//@access Private
const setGoal = asyncHandler(async(req,res)=>{
    if(req.body.text){
        res.status(400)
        throw new Error("please add a text field")
    }
    res.status(200).json({
        message:"Set goals"
    }) 
})
//@desc Update goal 
//@routes put/api/goals/:id
//@access Private
const updateGoal = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:`Update goals ${req.params.id}`
    })
})
//@desc Delete goals 
//@routes Get/api/goals/:id
//@access Private
const deleteGoal =asyncHandler( async(req,res)=>{
    res.status(200).json({
        message:`Delete goals ${req.params.id}`
    })
})


module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}