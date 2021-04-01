const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const User = require("./models/User");
const userRoutes = require("./routes/Users");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("INDEX");
});

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
