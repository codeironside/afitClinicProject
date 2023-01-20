const date = require("date");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Patient  = require("../../models/patient");
const patientDiagnosis = require("../../models/patientdiagnosis");
const { ObjectId } = require("mongodb");
const Drug = require("../../models/drugs");
const axios = require("axios");
const studentPR = require("../../models/patientPrescribtion");
const patientPrescribtion = require("../../models/patientPrescribtion");

//fetch diagnosis meaning

const diagnosisData = asyncHandler(async (req, res) => {
  const { word } = req.body;
  console.log(word);
  const api_key = process.env.meriam_api_secret;
  const options = {
    method: "GET",
    //doctor?key=your-api-key
    url: `https://www.dictionaryapi.com/api/v3/references/medical/json/${word}?key=${api_key}`,
  };

  axios
    .request(options)
    .then(function (response) {
      if (response.data[0].meta) {
        res.status(200).json(response.data);
      } else {
       

        res.status(400).json({
          message: "word not found",
          suggested: response.data,
        });
      }

    })
    .catch(function (error) {
      console.log(error);
      res.json(error);
    });
});







//inssert new records
const patientdiagnosis = asyncHandler(async (req, res) => {
  const { patientId, doctor, drug, diagnosis, ailment, dosage } = req.body;

  const { role, ...data } = req.staff;
  if (role == "doctor") {
    // console.log(req.params.proofid)
    const student = await Patient.findOne({ patientId: patientId });
    // console.log(student)

    if (!student) {
      // res.status(400)
      throw new Error("student record not found ");
    }
    //update schema with mongoose?
    const studentDiagnosed = await Patient.create({
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

const prescribtion = asyncHandler(async (req, res) => {
  const { matricNumber, drugName, dosage, frequncy } = req.body;
  // console.log(req.staff)
  const {role , ...data}=req.staff
  console.log(role)
  if(!role||role != "pharmacist" || role !="superAdmin"|| role != "doctor"){
    res.json({
      message:"not authorize"
    })
  }
  
  var prescribedDrugs=[]
  prescribedDrugs.push(drugName)
  prescribedDrugs.push(dosage)
  const StudentId = await Student.findOne({ matricNumber: matricNumber });
  const Drugfound = await Drug.findOne({ DrugNamelowercased: drugName });
  if (!Drugfound) {
    res.status(403).json({
      message: "Drug not found",
    });
  }
  const prescribed = await studentPrescribtion.create({
    studentId:StudentId._id,
    Date: new Date(),
    studentName:StudentId.name,
    matricNumber:StudentId.matricNumber,
    drug:prescribedDrugs,
    frequncy:frequncy


  });
  await Drug.findByIdAndUpdate(
    Drugfound._id,
    {$inc:{
      CurrentQuantity: -parseInt(dosage),
      // previousQuantity: druquantity.CurrentQuantity,
    }},
    { new: true }
  )
  if(prescribed){
    res.status(202).json(prescribed)
  }
});
module.exports = { patientdiagnosis, diagnosisData, prescribtion };
