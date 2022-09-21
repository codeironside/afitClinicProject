const mongoose = require("mongoose");
const studentschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add at name value"],
    },
    // passport: {
    //   type: String,
    //   required: [true, "please add a photo"],
    // },
    matricNumber: {
      type: String,
      required: [true, "please add an matric number"],
      unique: true,
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
