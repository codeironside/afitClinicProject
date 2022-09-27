const date = require("date");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const studentDiagnosis = require("../models/studentDiagnosis");
const { ObjectId } = require("mongodb");
const axios = require("axios");

//fetch diagnosis meaning

const diagnosisData = asyncHandler(async (req, res) => {
  const { word } = req.body;
  console.log(word)
  const api_key = process.env.meriam_api_secret
  const options = {
    
    method: "GET",
    //doctor?key=your-api-key
    url: `https://www.dictionaryapi.com/api/v3/references/medical/json/${word}?key=${api_key}`,

  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.json(error);
    });
});

//inssert new records
const studentdiagnosis = asyncHandler(async (req, res) => {
  const { matricNumber, doctor, prescribtions, diagnosis, ailment } = req.body;

  const { role, ...data } = req.staff;
  if (role == "doctor") {
    // console.log(req.params.proofid)
    const student = await Student.findOne({ matricNumber: matricNumber });
    // console.log(student)

    if (!student) {
      // res.status(400)
      throw new Error("student record not found ");
    }
    //update schema with mongoose?
    const studentDiagnosed = await studentDiagnosis.create({
      studentId: student.id,
      studentName: student.name,
      matricNumber: student.matricNumber,
      doctor: doctor,
      prescribtions: prescribtions,
      diagnosis: diagnosis,
      ailment: ailment,
      Date: new Date(),
    });
    //date in javascript?

    res.status(200).json(studentDiagnosed);
  } else {
    res.status(403).json({
      message: "unauthorized access",
    });
  }
});
module.exports = { studentdiagnosis, diagnosisData };
