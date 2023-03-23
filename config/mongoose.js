const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://victormitra15:HoG52SRUPu1iToUg@cluster0.i3eshan.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("There are some isssues connecting to the Database", err);
  });
