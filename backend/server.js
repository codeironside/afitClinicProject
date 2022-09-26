const express = require('express')
const path = require('path')
const colors = require("colors")
const dotenv = require('dotenv').config()
const {errorHandler}= require("./middleware/errormiddleware")
const port  = process.env.port|| 5000
const connectDB= require("./config/db")
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require("method-override");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");


// const axios = require("axios");

// const options = {
//     method: 'GET',
//     url: 'https://drug-info-and-price-history.p.rapidapi.com/1/druginfo',
//     params: {drug: 'advil'},
//     headers: {
//       'X-RapidAPI-Key': 'df085e32b2msh5e505dd3bf8fa50p16c8eajsn35385f307eaf',
//       'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com'
//     }
//   };
  
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });

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
app.use(methodOverride('_method'))


app.use('/api/staff', require('./routes/staffRoutes'))
app.use('/api/student', require('./routes/studentRoutes'))
app.use('/api/drug',require('./routes/drugRoutes'))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server listening on ${port}`)
} )
