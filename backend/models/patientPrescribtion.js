const mongoose = require("mongoose");
const studentPR = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PATIENT",
      required:[, "add a patientId"],
    },

    patientName: {
      type: String,
      required: [true, "please add a name"],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PATIENT",
      required: [true, "Please add a text value"],
    },
    doctor: {
      type: String,
      required: [true, "Please add a text value"],
    },
    diagnosisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patientDiagnosis",
      required: [true, "please add a field"],
    },
    drugId: {
      type: String,
      required:true
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
      default: false,
      required: [true, "please indicate if disbursed or not"],
    },
    disbursedby: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentPR", studentPR);
