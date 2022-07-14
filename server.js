const express = require('express')
const path = require('path')
const colors = require("colors")
const dotenv = require('dotenv').config()
const {errorHandler}= require("./backend/middleware/errormiddleware")
const port  = process.env.port|| 5000
const connectDB= require("./backend/config/db")

connectDB()

const app = express()
// app.set('views', path.join(__dirname, 'views'))
app.use(express.static("public"))
app.use('/css',express.static(__dirname + "public/css"))
app.use('/js',express.static(__dirname + "public/js"))
app.set("views", './views')
app.set("view engine", 'ejs')





app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/staff/', require('./backend/routes/staffRoutes'))
app.use('/api/student', require('./backend/routes/studentRoutes'))
app.use('/api/drug',require('./backend/routes/drugRoutes'))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server listening on ${port}`)
} )
