var express = require("express");
var router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  console.log("registering user");
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User exists" });
    }
    const newUser = new User({ username });
    ///passport hash uieste parola
    await User.register(newUser, password);
    res.status(201).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
