const express = require("express");
const app = express();

const router = express.Router();

router.use("/v1", require("./v1/index"));

module.exports = router;
