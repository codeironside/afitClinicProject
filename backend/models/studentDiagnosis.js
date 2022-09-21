const mongoose = require("mongoose");
const studentDiagnosis = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    doctor: {
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

module.exports = mongoose.model("studentDiagnosis", studentDiagnosis);
