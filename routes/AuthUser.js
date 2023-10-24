const express = require("express");
const UserAuthRoute =  express.Router();

UserAuthRoute.get("/auth/user", (req, res) => {
  res.send("auth users");
});

module.exports = UserAuthRoute;
