const express = require("express");
const app = express();
const doctorController = require("../../../../controllers/api/v1/doctorController");

const router = express.Router();

router.post("/register", doctorController.register);

router.post("/login", doctorController.login);

module.exports = router;
