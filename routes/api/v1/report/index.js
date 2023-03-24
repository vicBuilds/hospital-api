const express = require("express");
const app = express();
const reportController = require("../../../../controllers/api/v1/reportController");
const passport = require("../../../../config/passport-jwt");

const router = express.Router();

router.get(
  "/:status",
  passport.authenticate("jwt", { session: false }),
  reportController.allReportWithStatus
);

module.exports = router;
