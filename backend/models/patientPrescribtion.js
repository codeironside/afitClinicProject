const mongoose = require("mongoose");
const studentPR = mongoose.Schema(
  {
    patienId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PATIENT",
      required: true,
    },
    matricNumber:{
        type:String,
        required:[true, "please add matric Number"]
    },
    patientName:{
        type:String,
        required:[true, "please add a name"]
    },
    GivenBY: {
      type: String,
      ref: "Patient",
      required: [true, "Please add a text value"],
    },
    doctor: {
      type: String,
      ref: "Staff",
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentPR", studentPR);
