const mongoose = require("mongoose");
const studentPR = mongoose.Schema(
  {
    patienId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PATIENT",
      required: true,
    },
  
    patientName:{
        type:String,
        required:[true, "please add a name"]
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PATIENT",
      required: [true, "Please add a text value"],
    },
    doctor: {
      type: String,
      ref: "PATIENT",
        required: [true, "Please add a text value"],
    },
    drugId:{
      type:String
    },
    drugName: {
      type: String,
    },
    frequency: {
      type: String,
    },
    dosage: {
      type: String,
    },

    disbursed: {
      type: Boolean,
      default:false,
      required:[true, "please indicate if disbursed or not"]
    },
    disbursedby:{
      type:String
    },
    notes:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentPR", studentPR);
