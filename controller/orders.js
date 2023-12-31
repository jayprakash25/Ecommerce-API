const { order } = require("../models/order");
const { orderItem } = require("../models/orderItem");
const mongoose = require("mongoose");

const handleGet = async (req, res) => {
  const userOrderList = await order
    .find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!userOrderList) return res.status(500).send("No products found");

  res.send(userOrderList);
};

const handleGetOne = async (req, res) => {
  const userOrderList = await order
    .findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });

  if (!userOrderList) return res.status(500).send("No Orders found");

  res.send(userOrderList);
};

const handleUserOrders = async (req, res) => {
  const userOrderList = await order
    .find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });

  if (!userOrderList) return res.status(500).send("Error");

  res.send(userOrderList);
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
    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemsId) => {
        const OrderItem = await orderItem
          .findById(orderItemsId)
          .populate("product", "price");

        const totalPrice = OrderItem.product.price * OrderItem.quantity;
        return totalPrice;
      })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    console.log(totalPrice);
    const { shippingAddress1, city, zip, country, phone, user } = req.body;

    let newOrder = new order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1,
      city,
      zip,
      country,
      phone,
      totalPrice: totalPrice,
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
  const newOrder = await order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!newOrder) return res.status(500).send("Couldn't update order status...");

  res.send(newOrder);
};

const handleDelete = async (req, res) => {
  order
    .deleteOne({ _id: req.params.id })
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (item) => {
          await orderItem.deleteOne(item);
        });

        return res.status(200).send("Order deleted..");
      } else {
        return res.status(404).send("Error deleting order");
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: `Error deleting the order : ${err}` });
    });
};

module.exports = {
  handleGet,
  handlePost,
  handleGetOne,
  handleStatus,
  handleDelete,
};
