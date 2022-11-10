const mongoose = require("mongoose");
const Drugschema = mongoose.Schema(
  {
    DrugNamelowercased: {
      type: String,
      required: [true, "please specify a drug name"],
    },
    batchNumber: {
      type: String,
      required: [true, "please add a name "],
    },
    NafdacNumber: {
      type: String,
      required: [true, "please add a nafdac number"],
    },
    expirydate: {
      type: String,
      required: [true, "specify a matric number "],
    },
    totalquantity: {
      type: Number,
      required: [true, "specify a number "],
    },
    CurrentQuantity: {
      type: Number,
      required:[true,"specify a number"]
    },
    previousQuantity: {
      type: Number,
      default: "0",
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Drug", Drugschema);