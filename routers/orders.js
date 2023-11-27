const express = require("express");
const router = express.Router();
const { order } = require("../models/order");

router.get("/", async (req, res) => {
  const ordersList = await order.find();
  res.send(ordersList);
});

module.exports = router;
