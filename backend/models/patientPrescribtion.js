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
    GivenBY: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PATIENT",
      required: [true, "Please add a text value"],
    },
    doctor: {
      type: String,
      ref: "PATIENT",
        required: [true, "Please add a text value"],
    },
    drug: {
      type: mongoose.Schema.Types.Mixed,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentPR", studentPR);
