const mongoose = require("mongoose");
const patientschema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please add a name "],
    },
    middlename: {
      type: String
    },
    surname: {
      type: String,
      required: [true, "please add a name "],
    },
    // passport:{
    //     type:String,//will be a string,
    //     required:[true,"please add a photo"]
    // },
    role: {
      type: String,
      default: "patient",
      required: [true, "please specify a role"],
    },
    email: {
      type: String,
      unique:true,
      required: [true, "please specify a role"],
    },
    patientId: {
      type: String,
      required: [true, "please insert a patient ID"],
      unique: true,
    },
    password: {
      type: String,
    },
    date: {
      type: String,
      required: [true, "please include a year of birth"],
    },
    month: {
      type: String,
      required: [true, "please include a year of birth"],
    },
    year: {
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
      required: [true, "please include phone number"],
    },
    disabilities: {
      type: String,
      required: [true, "if no disabilities add as none"],
    },
    employementLetter: {
      type: String, //should be a file system fs url saved here
    },
    admissionLetter:{
      type:String
    },
    proofOfPayment:{
      type:String
    },
    previousDiagnosis: {
      type: String,
    },
    admitted:{
      type:Boolean,
      default:false
    }
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Patient", patientschema);
