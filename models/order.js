const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  item: String,
  quantity: Number,
  Address: String,
});

exports.order = mongoose.model("Orders", orderSchema);
