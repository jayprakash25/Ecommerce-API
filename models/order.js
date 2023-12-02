const mongoose = require("mongoose");
const { orderItem } = require("../models/orderItem");
const { User } = require("../models/user");

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: orderItem,
      required: true,
    },
  ],

  shippingAddress1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  totalPrice: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

exports.order = mongoose.model("Orders", orderSchema);
