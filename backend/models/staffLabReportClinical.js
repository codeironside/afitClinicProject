const mongoose = require("mongoose");
const staffLabReportClinical = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    timecollected: {
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
    // glucose:
    FBS: { type: String },
    RBS: { type: String },
    TwoHPP: { type: String },
    glysatedHaemoglobin: { type: String },
    // LiverFunctionTestAdult:
    bilirubin1: { type: String },
    bilirubin2: { type: String },
    bilirubin3: { type: String },
    AKphosphate: { type: String },
    SGOT: { type: String },
    SGPT: { type: String },
    protein: { type: String },
    albumin: { type: String },

    // bilirubinChildren: {
    B24HRSOLD: { type: String },
    NB48HRSOLD: { type: String },
    ThreeFivedays: { type: String },
    sevenDays: { type: String },
    // electroylyteUreaCeratine: {
    sodium: { type: String },
    potassium: { type: String },
    calcium: { type: String },
    phosphorus: { type: String },
    Bicarbonatr: { type: String },
    Urea: { type: String },
    UricAcid: { type: String },
    maleCeratine: { type: String },
    chloride: { type: String },
    femaleCeratine: { type: String },

    // lipidProfile:
    triglyceride: { type: String },
    cholestorolTotal: { type: String },
    cholestorolHDL: { type: String },
    cholestorolLDL: { type: String },
    others: {
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
  "staffLabReportClinical",
  staffLabReportClinical
);
