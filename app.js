const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");


const app = express();

app.get("/", (req, res) => {
  res.send("INDEX");
});

app.get("/users", require("./routes/Users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
