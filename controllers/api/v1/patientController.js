//Require all the Models

const patients = require("../../../models/patient");
const reports = require("../../../models/report");
const doctors = require("../../../models/doctor");

/* 
 This Controller is for registrtion of a Particular Patient

 Steps to Register a Patient(Check out in the try block):

 **Can only hit this api if any registered Doctor is logged in and the request has a valid token**

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

/* 
 Steps to Create a Report for a valid Patient(Check out in the try block):

 This Controller is for Creation of Report of a Particular Patient after Testing

**Can only hit this api if the Doctor is logged in and the request has a valid token**

1. Check if the id is for a valid patient.

2. Get the Doctor details from Db from req.doctorEmail field(Also check if the Doctor is registed with this mail id).

3. Create Report and send relevant status.

4. Log if there are some errors.

*/

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
        message: "Bad Request. Invalid Patient Id",
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

/* 
This Controller is for All Reports of a Particular Patient

 Steps to Create a Report for a valid Patient(Check out in the try block):

**Can only hit this api if the Doctor is logged in and the request has a valid token**

1. Find all the reports where patient id matches with req.params.id.

2. Sort them from old to latest.

3. Populate with only doctors name and email who created individual reports.

4. Log in neccessary errors.
*/

module.exports.allReports = async (req, res) => {
  try {
    let patientId = req.params.id;

    //console.log(patientId);

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

    let currentPatient = await patients.findOne({ _id: patientId });

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
