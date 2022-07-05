const express =require('express')
const { deleteModel } = require('mongoose')
const router = express.Router()
const {protect}= require('../middleware/authmiddleware')

//controller for tge routes file
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/staff')
//each function is imported from the goalcontroller file
router.route('/').get(protect,getGoals).post(protect,setGoal)
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports= router