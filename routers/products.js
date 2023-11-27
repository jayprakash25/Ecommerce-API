const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  res.send(productList);
});

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    stock: req.body.stock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
      console.log(createdProduct);
    })
    .catch((e) => {
      res.status(500).json({ error: e, success: false });
    });
});

module.exports = router;
