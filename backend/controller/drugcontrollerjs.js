const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const Staff = require("../models/staff");
const Drug = require("../models/drugs");
const axios = require("axios");
const drugs = require("../models/drugs");

// searched drugs
const searched = asyncHandler(async (req, res) => {
  const { searchedDrug } = req.body;

  const options = {
    method: "GET",
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
  const { batchNumber, NafdacNumber,DrugName, expirydate, Druginflow } = req.body;
  // const DrugName = req.body.;
  // const { role, ...data } = req.Staff;
console.log(DrugName)
  //convert to small letters in javascript?
  var DrugNamelowercased = DrugName.toLowerCase();

  // if (roles !== "records" || roles == "admin") {
  //   res.status(403);
  //   throw new Error("not an authorized user");
  // }
  //check if batch exist
    const DrugExist = await Drug.findOne({ DrugNamelowercased:DrugName  });
    // res.status(200).json(DrugExist)
    if (!DrugExist || (DrugExist.CurrentQuantity<10)) {
      res.status(202);
      const drug = await Drug.create({
        DrugNamelowercased,
        batchNumber,
        NafdacNumber,
        expirydate,
        CurrentQuantity: Druginflow,
        totalquantity: Druginflow,
        // previousQuantity,
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
      } 
      }else {
        res.status(405).json({
          message:"drug already exist"
        })
          
        };
      
    }
  
 
);
const updateDrugrecord = asyncHandler(async (req, res) => {
  const { DrugName, quantity } = req.body;
  //find drug
  drugNumber = parseInt(quantity)
  

  const druquantity = await Drug.findOne({ DrugNamelowercased: DrugName });
  console.log(druquantity.CurrentQuantity);
  if(!druquantity){
    res.status(code)
  }
  if (druquantity) {
    if (druquantity.CurrentQuantity > 10) {
      const drugsum = druquantity.totalquantity - drugNumber;
      await Drug.findByIdAndUpdate(
        druquantity._id,
        {$inc:{
          CurrentQuantity: -quantity,
          previousQuantity: druquantity.CurrentQuantity,
        }},
        { new: true }
      );
      await Drug.findByIdAndUpdate(
        druquantity._id,
        {$set:{
          
          previousQuantity: druquantity.CurrentQuantity,
        }},
        { new: true }
      );
      const mint = await Drug.findOne({ DrugNamelowercased: DrugName });
      res.status(200).json({
        message: mint,
      });
    } else {
      res.status(422).json({
        message: "Drug replenished\t ",
      });
    }
  } else {
    res.status(422).json({
      message: "drug not found",
    });
  }
});

module.exports = {
  registerNewdrug,
  searched,
  updateDrugrecord,
};
