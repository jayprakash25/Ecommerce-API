const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const userList = await User.find();
  res.send(userList);
});

module.exports = router;
