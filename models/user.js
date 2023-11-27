const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  Image: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
