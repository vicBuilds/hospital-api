const patients = require("../models/patient");
const reports = require("../models/report");
const doctors = require("../models/doctor");

/* 
 Steps to Register a Patient(Check out in the try block):

1. Check out if the Patient is already present or not.
2. If already present send the Patient Details.
3. If not already present create new Patient.

*/

module.exports.register = async (req, res) => {
  try {
    // console.log(req.body);
    console.log("User is ", req.user);
    let isPatientAlreadyPresent = await patients.find({
      phone: req.body.phone,
    });

    //console.log(isPatientAlreadyPresent);

    if (isPatientAlreadyPresent.length != 0) {
      return res.status(200).json({
        message:
          "Patient is Already Registered. Please have the Details as Below",
        data: isPatientAlreadyPresent,
      });
    }

    let newPatient = await patients.create(req.body);

    return res.status(200).json({
      message: "Patient Registeration Successfull",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async (req, res) => {
  //console.log("Requested User is ", req.user);

  try {
    let patientId = req.params.id;
    let { doctorEmail } = req.body;

    //console.log(patientId);

    let currentPatient = await patients.findOne({
      _id: patientId,
    });

    //console.log(currentPatient);

    if (currentPatient.length == 0) {
      return res.status(400).json({
        message: "Bad Request. Check if the Patient is Valid or Not",
      });
    }

    let doctor = await doctors.findOne({
      email: doctorEmail,
    });

    if (!doctor) {
      return res.status(400).json({
        message: `Doctors Mail Id doesn't match. Kindly re-submit`,
      });
    }

    //console.log(currentPatient._id);
    let report = await reports.create({
      createdBy: doctor._id,
      status: req.body.status,
      patient: currentPatient,
    });

    await currentPatient.reports.push(report);
    await currentPatient.save();

    return res.status(200).json({
      message: `Report Created with status ${req.body.status} for patient ${currentPatient.name}`,
    });
  } catch (err) {
    console.log("Some Error Occured while creating reports", err);
    return res.status(400).json({
      message: `Internal Server Error,${err}`,
    });
  }
};

module.exports.allReports = async (req, res) => {
  try {
    let patientId = req.params.id;

    let currentPatient = await patients
      .findOne({
        _id: patientId,
      })
      .select("name");

    let patientReports = await reports
      .find({
        patient: patientId,
      })
      .sort("createdAt")
      .select(["status", "createdAt"])
      .populate({
        path: "createdBy",
        model: "doctors",
        select: ["name", "email"],
      });

    //console.log(patientReports);

    // let currentPatient = await patients.findOne({ _id: patientId }).populate({
    //   path: "reports",
    // });

    // console.log("The Current Patient is ", currentPatient);

    // if (!currentPatient) {
    //   return res.status(400).json({
    //     message: `Internal Server Error`,
    //   });
    // }

    return res.status(200).json({
      message: `All reports for Patient ${currentPatient.name}`,
      data: patientReports,
    });
  } catch (err) {
    ///console.log("Error in finding all reports", err);
    return res.status(400).json({
      message: `Internal Server Error, ${err}`,
    });
  }
};
