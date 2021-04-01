const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("USERS");
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "That email is already registered" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
      });

      newUser
        .save()
        .then((user) => res.send(user))
        .catch((err) => res.send(err));
    }
  });
});

module.exports = router;
