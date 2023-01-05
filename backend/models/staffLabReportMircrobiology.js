const mongoose = require("mongoose");
const staffLabReportMircrobiology = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    labattendant: {
      type: String,
      required: [true, "Please add a text value"],
    },
    LabNo: {
      type: String,
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
    age: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    ClinicalNotesDiagnosis: {
      type: String,
      required: true,
    },
    specimen: {
      type: String,
      required: true,
    },
    investigationRequired: {
      type: String,
      required: true,
    },
    //lapreport:
    macro: { type: String },
    micro: { type: String },
    macro1: { type: String },
    micro1: { type: String },
    // UrinaLysis: {
    blood: { type: String },
    bilirubin: { type: String },
    protein: { type: String },
    ketone: { type: String },
    AcetivAcid: { type: String },
    glucose: { type: String },
    nitrate: { type: String },
    urobilinogen: { type: String },
    OH: { type: String },
    SG: { type: String },
    others: { type: String },

    fecalOccultBlood: {
      type: String,
      required: true,
    },
    culture: {
      type: String,
      required: true,
    },
    sensitivityTest: {
      type: String,
      required: true,
    },
    otherResult: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: String,
      required: true,
    },
    reviewedBY: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "staffLabReportMircrobiology",
  staffLabReportMircrobiology
);
