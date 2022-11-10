const mongoose = require("mongoose");
const studentPR = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    matricNumber:{
        type:String,
        required:[true, "please add matric Number"]
    },
    studentName:{
        type:String,
        required:[true, "please add a name"]
    },
    GivenBY: {
      type: String,
      ref: "Staff",
      //   required: [true, "Please add a text value"],
    },
    doctor: {
      type: String,
      ref: "Staff",
      //   required: [true, "Please add a text value"],
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

    Date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentPR", studentPR);
