const { order } = require("../models/order");
const { orderItem } = require("../models/orderItem");
const mongoose = require("mongoose");

const handleGet = async (req, res) => {
  const orderList = await order
    .find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) return res.status(500).send("No products found");

  res.send(orderList);
};

const handleGetOne = async (req, res) => {
  const orderList = await order
    .findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });

  if (!orderList) return res.status(500).send("No products found");

  res.send(orderList);
};

const handlePost = async (req, res) => {
  try {
    const orderItemsIds = Promise.all(
      req.body.orderItems.map(async (item) => {
        let newOrderItem = new orderItem({
          quantity: item.quantity,
          product: item.product,
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    const {
      // orderItems,
      shippingAddress1,
      city,
      zip,
      country,
      phone,
      totalPrice,
      user,
    } = req.body;

    let newOrder = new order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1,
      city,
      zip,
      country,
      phone,
      totalPrice,
      user,
    });
    newOrder = await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleStatus = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Order Id");
  }
};

module.exports = { handleGet, handlePost, handleGetOne };
