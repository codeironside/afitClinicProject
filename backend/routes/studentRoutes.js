const express = require("express")
const router = express.Router()
const {
    registerStudent,
    getStudent,
    loginStudent} = require('../controller/studentController')

const {protect}= require('../middleware/authmiddleware')

router.post("/", registerStudent)
router.post("/login", loginStudent)
router.get("/me", protect,getStudent)


module.exports = router