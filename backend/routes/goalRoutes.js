const express =require('express')
const { deleteModel } = require('mongoose')
const router = express.Router()

//controller for tge routes file
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/goalController')
//each function is imported from the goalcontroller file
router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports= router