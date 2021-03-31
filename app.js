const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const User = require("./models/User");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // const user = new User({
  //   name: "Pickle Rick",
  //   email: "pickleRick@jira.clone",
  //   avatarUrl: "https://imgur.com/qjwEM9I",
  // });
  // user.save();
  res.send("INDEX");
});

app.get("/users", require("./routes/Users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
