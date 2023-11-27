const mongoose = require("mongoose");

async function connectDB(url) {
  await mongoose.connect(url);
  return console.log("Connected to db");
}

module.exports = {
  connectDB,
};
