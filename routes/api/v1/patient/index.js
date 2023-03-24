const express = require("express");
const app = express();
const passport = require("../../../../config/passport-jwt");
const patientController = require("../../../../controllers/api/v1/patientController");

const router = express.Router();

router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.register
);

router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  patientController.createReport
);

router.get(
  "/:id/all_reports",
  passport.authenticate("jwt", { session: false }),
  patientController.allReports
);

module.exports = router;
