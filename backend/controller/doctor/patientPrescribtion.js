const asyncHandler = require("express-async-handler");
const stafflogger = require("../../utils/stafflogs");
const patientPrescribtion = require("../../models/patientPrescribtion");

//@route api/patient/prescribtion
//access private
//desc prescribtion for student

const prescribtion = asyncHandler(async (req, res) => {
  const { id } = req.staff;
  const staff = await Patient.findById(id);
  if (staff.role === "doctor" || staff.role === "superAdmin") {
    const { drugName, dosage, frequncy, patientId } = req.body;
    // console.log(req.staff)

    const patientfound = await Patient.findOne({ patientId: patientId });
    if (patientfound) {
    }
    const Drugfound = await Drug.findOne({ DrugNamelowercased: drugName });
    if (!Drugfound) {
      res.status(403).json({
        message: "Drug not found",
      });
    }
    var disbursed = false;
    const prescribed = await patientPrescribtion.create({
      studentId: patientfound._id,
      studentName: `${patientfound.firsname}  ${patientfound.middlename}  ${patientfound.surname}`,
      patientId: patientfound.patienId,
      drudid: Drug._id,
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
  } else if (staff.role === "pharmacost" || staff.role === "superAdmin") {
    const { disbursed, notes } = req.body;
    if (disbursed === true) {
      const updateDrug = await Drug.findByIdAndUpdate(
        Drugfound._id,
        {
          $inc: {
            CurrentQuantity: -parseInt(dosage),
            // previousQuantity: druquantity.CurrentQuantity,
          },
        },
        { new: true }
      );
      const prescribed = await patientPrescribtion.findByIdAndUpdate(
        id,
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
        id,
        { $set: { notes: notes } },
        { new: true, useFindAndModify: false }
      );
      if (prescribed) {
        res.status(200).json({ hey: prescribed });
      }
    }
  } else {
    res.status(401);
    throw new Error("not authorized");
  }
});
