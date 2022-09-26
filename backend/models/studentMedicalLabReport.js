const mongoose = require("mongoose");
const studentLabReport = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    labattendant: {
      type: String,
      required: [true, "Please add a text value"],
    },
    Date: {
      type: String,
    },
    rank: {
      type: String,
    },
    SVC_NO: {
      type: String,
    },

    surname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required:true
    },
    age: {
      type: String,
      required:true
    },
    sex: {
      type: String,
      required:true
    },
    ward: {
      type: String,
      required:true
    },
    tel: {
      type: String,
      required:true
    },
    ClinicalNotesDiagnosis: {
      type: String,
      required:true
    },
    specimen: {
      type: String,
      required:true
    },
    investigationRequired: {
      type: String,
      required:true
    },
    labReport: {
      type: String,
      required:true
    },
    surname: {
      type: String,
      required:true
    },
    surname: {
      type: String,
      required:true
    },
    surname: {
      type: String,
      required:true
    },
    surname: {
      type: String,
      required:true
    },
    surname: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentLabReport", studentLabReport);
