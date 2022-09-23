const mongoose = require("mongoose");
const Staffschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name "],
    },
    // passport:{
    //     type:String,//will be a string,
    //     required:[true,"please add a photo"]
    // },
    role: {
      type: String,
      default: "staff",
      required: [true, "please specify a role"],
    },
    email: {
      type: String,
      unique:false,
      required: [true, "please specify a role"],
    },
    StaffNumber: {
      type: String,
      required: [true, "specif a staffNumer"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "add a password"],
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
      required: [true, "please include phone number"],
    },
    disabilities: {
      type: String,
      required: [true, "if no disabilities add as none"],
    },
    employementLetter: {
      type: String, //should be a file system fs url saved here
    },

    previousDiagnosis: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Staff", Staffschema);
