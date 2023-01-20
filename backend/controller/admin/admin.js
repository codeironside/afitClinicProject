const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patient");
const bcrypt = require("bcryptjs")

const loginAdmin = asyncHandler(async (req, res) => {
  const { patientId, password } = req.body;

  const patient = await Patient.findOne({ patientId });
  if (patient && patient && bcrypt.compare(password, patient.password)) {
    if (patient.role === "superAdmin") {
      const cursor = await Patient.find({});
      //    const oneUSer= await  Patient.findOne({ _id: patientId }).populate(patientId)
      // const cursor =await Patient.find({}).select(["patientId","firstName", "admitted"])

      res.status(200).json(cursor);
    } else {
      res.status(401);
      throw new Error("not authorized");
    }
  } else {
    res.status(401);
    throw new Error("invalid credentials")
  }
});

module.exports = loginAdmin;
