const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const Staff = require("../models/staff");
const Drug = require("../models/drugs");
const axios = require("axios");

// searched drugs
const searched = asyncHandler(async (req, res) => {
   const {searchedDrug} = req.body
 

  const options = {
    method: 'GET',
    url: "https://drug-info-and-price-history.p.rapidapi.com/1/druginfo",
    params: { drug: searchedDrug },
    headers: {
      "X-RapidAPI-Key": process.env.rapid_api_secret,
      "X-RapidAPI-Host": "drug-info-and-price-history.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      // console.error(error);
      res.json(error);
    });
});

// const student = require('../models/student')

//@desc upload new drugs
//@routes POST/api/staff
//@access Public

const registerNewdrug = asyncHandler(async (req, res) => {
  const {
    batchNumber,
    NafdacNumber,
    expirydate,
    // CurrentQuantity,
    totalquantity,
  } = req.body;
  const DrugName = req.body.DrugName;
  const { role, ...data } = req.Staff;

  //convert to small letters in javascript?
  var DrugNamelowrcased = DrugName.toLowerCase();

  if (roles !== "records" || roles == "admin") {
    res.status(403);
    throw new Error("not an authorized user");
  }
  //check if batch exist
  //   const batchNumbers = await Drug.findOne({ batchNumber });
  //   if (batchNumbers) {
  //     res.status(400);
  //     throw new Error("this batch of drugs already exist");
  //   }
  //hash the password
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword= await bcrypt.hash(password,salt)
  const drug = await Drug.create({
    DrugNamelowrcased,
    batchNumber,
    NafdacNumber,
    expirydate,
    // CurrentQuantity,
    totalquantity,
  });
  if (drug) {
    res.status(201).json({
      _id: drug.id,
      DrugName: drug.DrugNamelowrcased,
      batchNumber: drug.batchNumber,
      NafdacNumber: drug.NafdacNumber,
      expiryDate: drug.expiryDate,
      totalquantity: drug.totalquantity,
      //   currentQuantity: drug.currentQuantity,

      // token:generateToken(student._id.roles)
    });
  } else {
    res.status(400);
    throw new Error("Invalid  data");
  }
});

module.exports = {
  registerNewdrug,
  searched,
};
