const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 9000;
const db = require("./config/mongoose");

// For parsing req.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", require("./routes/index"));

app.listen(port, (err) => {
  if (err) {
    console.log("There is an Error Starting the server", err);
  }
  console.log(`Server Started on Port: ${port}`);
});
