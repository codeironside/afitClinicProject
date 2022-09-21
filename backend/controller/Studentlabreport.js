const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const studentLabReport = require("../models/studentLabReport");
const { ObjectId } = require("mongodb");
const MicroBiology = asyncHandler(async (req, res) => {
    const { name } = req.body;
  //time in javascript?
// var d = new Date("2011-04-20T09:30:51.01");
// d.getHours(); // => 9
// d.getMinutes(); // =>  30
// d.getSeconds(); // => 51


// var d = new Date(); // for now
// d.getHours(); // => 9
// d.getMinutes(); // =>  30
// d.getSeconds(); // => 51



    const student = await Student.findById(req.params.id);
    await studentLabreport.create({
        timeCollected: new Date()

            
    });
  });
  const ClinicalReport = asyncHandler(async (req, res) => {
    const { name } = req.body;
  
    const student = await Student.findById(req.params.id);
    await studentLabreport.create({

    });
  });