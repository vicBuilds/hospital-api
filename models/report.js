const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "Negative",
        "Travelled-Quarantine",
        "Symptoms-Quarantine",
        "Positive-Admit",
      ],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
    },
  },
  {
    timestamps: true,
  }
);

const Reports = mongoose.model("reports", reportSchema);

module.exports = Reports;
