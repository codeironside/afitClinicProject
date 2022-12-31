const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require("method-override");


let gfs
const studentschema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "please add last name"],
    },
    email: {
      type: String,
      required: [true, "please add a photo"],
    },
    matricNumber: {
      type: String,
      required: [true, "please add an matric number"],
      unique: true,
    },
    sex:{
      type:String,
      required:[true,"please specify a sex"]
    },
    YOB: {
      type: String,
      required: [true, "please include a year of birth"],
    },
    bloodGroup: {
      type: String,
      required: [true, "please include a blood group"],
    },
    genotype: {
      type: String,
      required: [true, "please include a genotype"],
    },
    phoneNumber: {
      type: String,
      required: [true, "please include a year of birth"],
    },
    disabilities: {
      type: String,
      required: [true, "please include a year of birth"],
    },
    admissionLetter: {
      type: String, //should be a file system fs url saved here
    },
    proveOfPayment: {
      type: String, // should be an file system url here to
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Student", studentschema);
