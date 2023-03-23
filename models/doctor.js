const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Doctors = mongoose.model("doctors", doctorSchema);

module.exports = Doctors;
