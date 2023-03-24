const express = require("express");
const app = express();

const router = express.Router();

router.use("/doctor", require("./doctor/index"));

router.use("/patients", require("./patient/index"));

router.use("/reports", require("./report/index"));

module.exports = router;
