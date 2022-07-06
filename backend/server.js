const express = require('express')
const colors = require("colors")
const dotenv = require('dotenv').config()
const {errorHandler}= require("./middleware/errormiddleware")
const port  = process.env.port|| 5000
const connectDB= require("./config/db")

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/staff', require('./routes/staffRoutes'))
app.use('/api/student', require('./routes/studentRoutes'))
app.use('/api/drug',require('./routes/drugRoutes'))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server listening on ${port}`)
} )
