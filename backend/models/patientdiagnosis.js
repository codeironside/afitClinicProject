const mongoose = require("mongoose");
const patientDiagnosis = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    patientName: {
      type: String,
      required: [true, "Please add a text value"],
    },
    ailment: {
      type: String,
    },
    prescribtions: {
      type: String,
    },
    diagnosis: {
      type: String,
    },

    Date: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patientDiagnosis", patientDiagnosis);
