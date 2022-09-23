const express =require('express')
const { deleteModel } = require('mongoose')
const router = express.Router()
const {protect}= require('../middleware/authmiddleware')


//controller for tge routes file
const {registerStaff, loginStaff, aboutClinic, loginStaffs,prescribtions, Clinicservices, getStaff} = require('../controller/staffcontroller')
//each function is imported from the goalcontroller file
router.route('/register').post(registerStaff)
router.route('/index').get(aboutClinic)
router.route(' ').get(aboutClinic)
router.route('/login').get(loginStaffs)
router.route('/login').post(protect,loginStaff)
router.route('/doctors').get(prescribtions)
router.route('/doctors').post(prescribtions)
router.route("/services").get(Clinicservices)
router.route("/me").post( protect, getStaff);
// .post(protect,setGoal)
// router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports= router