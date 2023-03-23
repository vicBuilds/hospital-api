const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctors",
    },
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "Patients",
    },
  },
  {
    timestamps: true,
  }
);

const Reports = mongoose.model("reports", reportSchema);

module.exports = Reports;
