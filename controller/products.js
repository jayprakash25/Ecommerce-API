const Product = require("../models/product");

const handleGet = async (req, res) => {
  const productList = await Product.find();
  res.send(productList);
};

const handlePost = (req, res) => {
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
};

module.exports = { handleGet, handlePost };
