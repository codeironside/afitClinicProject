const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = asyncHandler(async (req, res) => {
  const { patientId, password } = req.body;

  const patient = await Patient.findOne({ patientId: patientId });
  if (patient && patient && bcrypt.compare(password, patient.password)) {
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
  const { patientId } = req.id;
//TODO:work on this ASAP when you come back
  Patient.aggregate([
    {
      $match: { _id: patientId },
    },
    {
      $lookup: {
        from: "patient",
        localField: "_id",
        foreignField: "user_id",
        as: "shop_info",
      },
    },
    {
      $unwind: "$shop_info",
    },
    {
      $lookup: {
        from: "products",
        localField: "shop_info._id",
        foreignField: "shop_id",
        as: "product_info",
      },
    },
    {
      $unwind: "$product_info",
    },
    {
      $lookup: {
        from: "purchases",
        localField: "product_info._id",
        foreignField: "product_id",
        as: "purchases_info",
      },
    },
  ]);
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
module.exports = { loginAdmin, getoneProfession };
