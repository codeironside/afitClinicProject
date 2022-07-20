const express =require('express')
const { deleteModel } = require('mongoose')
const router = express.Router()
const {protect}= require('../middleware/authmiddleware')


//controller for tge routes file
const {registerStaff, loginStaff, aboutClinic, loginStaffs,prescribtions, Clinicservices} = require('../controller/staffcontroller')
//each function is imported from the goalcontroller file
router.route('/register').post(registerStaff)
router.route('/index').get(aboutClinic)
router.route('').get(aboutClinic)
router.route('/login').get(loginStaff)
router.route('/login').post(loginStaffs)
router.route('/doctors').get(prescribtions)
router.route('/doctors').post(prescribtions)
router.route("/services").get(Clinicservices)
// .post(protect,setGoal)
// router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports= router