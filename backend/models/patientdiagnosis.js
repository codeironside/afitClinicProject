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
    doctorId: {
      type:String,
      required:[true,'please add a doctor id']
    },
    doctorname: {type:String,
      required:[true,'please add a doctor id']},
    ailment: {
      type: String,
    },

    diagnosis: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patientDiagnosis", patientDiagnosis);
