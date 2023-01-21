const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = asyncHandler(async (req, res) => {
  const { patientId, password } = req.body;

  const patient = await Patient.findOne({ patientId: patientId });
  if (patient && bcrypt.compare(password, patient.password)) {
    if (patient.role === "superAdmin") {
      const cursor = await Patient.find({});
      //    const oneUSer= await  Patient.findOne({ _id: patientId }).populate(patientId)
      // const cursor =await Patient.find({}).select(["patientId","firstName", "admitted"])

      res.status(200).json({
        details: {
          name: patient.firstName,
          token: generateToken(patient._id),
          role: patient.role,
        },
        dashboard: cursor,
      });
    } else {
      res.status(401);
      throw new Error("not authorized");
    }
  } else {
    res.status(401);
    throw new Error("invalid credentials");
  }
});

const getoneProfession = asyncHandler(async (req, res) => {
  const { profession } = req.body;
  const { id } = req.staff;

  const admin = await Patient.findById(id);

  if (!admin) {
    res.status(401);
    throw new Error("invalid credentials");
  }
  if (admin.role === "admin" || admin.role === "superAdmin") {
    const role = await Patient.find({ role: { $in: [profession] } }).select([
      "patientId",
      "firstName",
      "admitted",
      "role",
    ]);

    if (!role) {
      res.status(404);
      throw new Error("profession not found");
    } else {
      res.status(200).json(role);
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const getonepatient = asyncHandler(async (req, res) => {
  const { patientId } = req.body;
  //TODO:work on this ASAP when you come back
  const patientONeid = await Patient.findOne({patientId:patientId})
   const lookup = await Patient.aggregate([
    {
      $match: { _id: patientONeid._id },
    },
    {
      $lookup: {
        from: "patientdiagnoses",
        localField: "_id",
        foreignField: "patientId",
        as: "patientdiagnoses",
      },
    },
    {
      $unwind: "$patientId",
    },
    // {
    //   $lookup: {
    //     from: "patientPrescribtion",
    //     localField: "_id",
    //     foreignField: "patientId",
    //     as: "produ",
    //   },
    // },
    // {
    //   $unwind: "$patientPrescribtion",
    // },
    // {
    //   $lookup: {
    //     from: "purchases",
    //     localField: "product_info._id",
    //     foreignField: "product_id",
    //     as: "purchases_info",
    //   },
    // },
  ]);

  if(lookup){
    res.status(200).json({user:lookup})
  }else{
    res.status(400)
    throw new Error("user not found")
  }
});

const shalom = asyncHandler(async(req,res) => {
  const{id}= req.body
})
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
module.exports = { loginAdmin, getoneProfession, getonepatient };
