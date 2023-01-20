const date = require("date");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patient");
const patientDiagnosis = require("../../models/patientdiagnosis");
const Drug = require("../../models/drugs");
const axios = require("axios");
const patientprescribtion = require("../../models/patientPrescribtion");
const patientPrescribtion = require("../../models/patientPrescribtion");
const stafflogger = require("../../utils/stafflogs");

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

// desc inssert new diagnosis
//@route api/patient/diagnosis
//access private
const patientdiagnosis = asyncHandler(async (req, res) => {
  const { patientId, diagnosis, ailment } = req.body;
  const { id } = req.staff;

  const doc = await Patient.findById(id);

  if (doc.role === "doctor" || doc.role === "superAdmin") {
    // console.log(req.params.proofid)
    const patient = await Patient.findOne({ patientId: patientId });
    // console.log(student)

    if (!patient) {
      // res.status(400)
      throw new Error("patient record not found ");
    }
    //update schema with mongoose?
    const patientDiagnosed = await patientDiagnosis.create({
      patientId: patient.id,
      patientName: `${patient.firstName}  ${patient.middlename}  ${patient.surname}`,
      doctorId: id,
      doctorname: `${doc.firstName}  ${doc.middlename}  ${doc.surname}`,
      diagnosis: diagnosis,
      ailment: ailment,
    });
    //date in javascript?
    if (patientDiagnosed) {
      res.status(200).json({ diagnosis: patientDiagnosed });
      stafflogger.info(
        `  doctor  with id: ${patientId} created a diagnosis:${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
      );
    }
  } else {
    res.status(403).json({
      message: "unauthorized access",
    });
  }
});

//@route api/patient/prescribtion
//access private
//desc prescribtion for student

const prescribtion = asyncHandler(async (req, res) => {
  const { drugName, dosage, frequncy, patienId } = req.body;
  // console.log(req.staff)
  const { id } = req.staff;
  const staff = await Patient.findById(id);
  if (staff) {
    var prescribedDrugs = [];
    prescribedDrugs.push(drugName);
    prescribedDrugs.push(dosage);
    const patientId = await Patient.findOne({ patientId: patientId });
    if (patientId) {
    }
    const Drugfound = await Drug.findOne({ DrugNamelowercased: drugName });
    if (!Drugfound) {
      res.status(403).json({
        message: "Drug not found",
      });
    }
    const prescribed = await patientPrescribtion.create({
      studentId: StudentId._id,
      Date: new Date(),
      studentName: StudentId.name,
      matricNumber: StudentId.matricNumber,
      drug: prescribedDrugs,
      frequncy: frequncy,
    });
    await Drug.findByIdAndUpdate(
      Drugfound._id,
      {
        $inc: {
          CurrentQuantity: -parseInt(dosage),
          // previousQuantity: druquantity.CurrentQuantity,
        },
      },
      { new: true }
    );
    if (prescribed) {
      res.status(202).json(prescribed);
    }
  }
});
module.exports = { patientdiagnosis, diagnosisData, prescribtion };
