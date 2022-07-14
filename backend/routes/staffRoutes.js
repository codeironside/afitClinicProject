const express =require('express')
const { deleteModel } = require('mongoose')
const router = express.Router()
const {protect}= require('../middleware/authmiddleware')


//controller for tge routes file
const {registerStaff, loginStaff, aboutClinic} = require('../controller/staffcontroller')
//each function is imported from the goalcontroller file
router.route('/register').post(registerStaff)
router.route('').get(aboutClinic)
router.route('/login').post(loginStaff)
// .post(protect,setGoal)
// router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports= router