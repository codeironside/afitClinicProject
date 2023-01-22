const asyncHandler = require("express-async-handler");
const stafflogger = require("../../utils/stafflogs");
const patientPrescribtion = require("../../models/patientPrescribtion");
const Patient = require("../../models/patient");
const Drug = require("../../models/drugs");

//@route api/patient/prescribtion
//access private
//desc prescribtion for student

const prescribtions = asyncHandler(async (req, res) => {
  const { id } = req.staff;
  const staff = await Patient.findById(id);
  if (staff.role === "doctor") {
    const { drugName, dosage, frequncy, patientId, diagnosisID } = req.body;
    // console.log(req.staff)

    const patientfound = await Patient.findOne({ patientId: patientId });

    if (!patientfound) {
      res.status(401);
      throw new Error("patient not found");
    }
    const Drugfound = await Drug.findOne({ DrugName: drugName });

    if (Drugfound) {
      var disbursed = false;
      const prescribed = await patientPrescribtion.create({
        patientId: patientfound._id,
        patientName: `${patientfound.firstName}  ${patientfound.middlename}  ${patientfound.surname}`,
        doctorId: staff._id,
        doctor: `${staff.firstName}  ${staff.middlename} ${staff.surname}`,
        diagnosisId: diagnosisID,
        patientId: patientfound.patienId,
        drugId: Drugfound._id,
        drugName: drugName,
        dosage: dosage,
        frequncy: frequncy,
        disbursed: disbursed,
      });
      if (prescribed) {
        res.status(200).json({ message: prescribed });
        stafflogger.info(
          `  doctor with id: ${id} created  a prescribtion for ${patientId} coode:${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
        );
      }
    } else {
      var disbursed = false;
      const prescribed = await patientPrescribtion.create({
        patientId: patientfound._id,
        patientName: `${patientfound.firsname}  ${patientfound.middlename}  ${patientfound.surname}`,
        doctorId: staff._id,
        doctor: `${staff.firstName}  ${staff.middlename} ${staff.surname}`,
        diagnosisId: diagnosisID,
        patientId: patientfound.patienId,
        drugId: "drug not found",
        drugName: drugName,
        dosage: dosage,
        frequncy: frequncy,
        disbursed: disbursed,
      });
      if (prescribed) {
        res.status(200).json({ message: prescribed });
        stafflogger.info(
          `  doctor with id: ${id} created  a prescribtion for ${patientId} coode:${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
        );
      }
    }
  } else if (staff.role === "pharmacist" || staff.role === "superAdmin") {
    const { disbursed, notes, Drug, patientprescribtionId } = req.body;
    
    if (disbursed === "true") {
      const updateDrug = await Drug.findByIdAndUpdate(
        Drug._id,
        {
          $inc: {
            CurrentQuantity: -parseInt(dosage),
            // previousQuantity: druquantity.CurrentQuantity,
          },
        },
        { new: true }
      );
      const prescribed = await patientPrescribtion.findByIdAndUpdate(
        patientprescribtionId,
        { $set: { disbursed: true, dusbursedby: staff._id, notes: notes } },
        { new: true, useFindAndModify: false }
      );
      if (prescribed) {
        res.status(202).json({ messgae: prescribed, drug: updateDrug });
        stafflogger.info(
          `  pharmacist with id: ${id} disbursed a drug with drugid ${Drug._id} for patient: ${patientId} coode:${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
        );
      }
    } else {
      const prescribed = await patientPrescribtion.findByIdAndUpdate(
        patientprescribtionId,
        { $set: { notes: notes } },
        { new: true, useFindAndModify: false }
      );
      if (prescribed) {
        res.status(200).json({ patient: prescribed });
        stafflogger.info(
          `  pharmacist with id: ${id} could not disbursed drug with drugid ${Drug._id} for patient: ${patientId}, because drug is not in store code:${res.statusCode} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} `
        );
      }
    }
  } else {
    res.status(401);
    throw new Error("not authorized");
  }
});

module.exports = { prescribtions };
