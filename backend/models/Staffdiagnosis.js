
const staffDiagnosis = mongoose.Schema({
  staffID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  doctor: {
    type: String,
    required:true
  },
  prescribtions: {
    type: String,
  },
  doctorFindings: {
    type: String,
  },
  diagnosis: {
    type: String,
  },

  Date: {
    type: String,
  },
},{
    timestamps:true
});

module.exports = staffDiagnosis;
