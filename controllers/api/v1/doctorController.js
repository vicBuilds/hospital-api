const doctors = require("../../../models/doctor");

//Requiring jwt for creation of token after credentials match(Checkout the login Controller)
const jwt = require("jsonwebtoken");

/*
***Steps****
1. Check if Doctor already exists with email as the Primary Key.
2. If Doctor exists, send the registered email. 
3. If the Doctor Doesn't exists create a new Doctor, email must be the Primary Key.
4. If a new Doctor is registered send the message that User Cretion succesful.
5. If Error send the error
*/

module.exports.register = async (req, res) => {
  try {
    //console.log(req.body);
    let isDoctorAlreadyPresent = await doctors.find({
      email: req.body.email,
    });

    //console.log(isDoctorAlreadyPresent);

    if (isDoctorAlreadyPresent.length != 0) {
      return res.status(200).json({
        message: "Doctor is Already Registered. Please Login",
        data: isDoctorAlreadyPresent.email,
      });
    }

    let newDoctor = await doctors.create(req.body);

    return res.status(200).json({
      message: "New Doctor Registered",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/*
****Steps****
1. Check the Crendental with those saved in the database. If it match return the JWT token.
2. If the Credentails fon't macth send the reply.
*/

module.exports.login = async (req, res) => {
  try {
    let doctor = await doctors.findOne({ email: req.body.email });
    // console.log(doctor);

    if (!doctor || doctor.password != req.body.password) {
      return res.status(401).json({
        data: [],
        message: "Unauthorised Access. Credentials Don't Match",
      });
    }

    return res.status(200).json({
      message: "Access Granted. This is your web token. Please keep it safe",
      data: {
        // Function of jwt please find from jwt web token documentation.
        // Encrypting the doctor using the key
        token: jwt.sign(doctor.toJSON(), "secret@qwervddrw123/7e8wwqwecfe1/4", {
          expiresIn: "10000000",
        }),
      },
    });
  } catch (err) {
    return res.status(500).json({
      data: [],
      messaage: "Internal Server Error",
    });
  }
};
