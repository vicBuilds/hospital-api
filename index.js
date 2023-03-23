const express = require("express");

const app = express();
const port = 9000;
const db = require("./config/mongoose");

app.use("/", require("./routes/api/v1/index.js"));

app.listen(port, (err) => {
  if (err) {
    console.log("There is an Error Starting the server", err);
  }
  console.log(`Server Started on Port: ${port}`);
});
