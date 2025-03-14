const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route is working!");
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
