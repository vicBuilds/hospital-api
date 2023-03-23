const express = require("express");
const app = express();
const doctorController = require("../../../../controllers/doctorController");

const router = express.Router();

router.get("/register", doctorController.register);

module.exports = router;
