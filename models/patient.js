const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reports",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patients = mongoose.model("patients", patientSchema);

module.exports = Patients;
