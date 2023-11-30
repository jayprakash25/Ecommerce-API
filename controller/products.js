const Product = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

const handleGet = async (req, res) => {
  let filter = [];

  if (req.query.categories) {
    filter = req.query.categories.split(",");
  }

  const productList = await Product.find({ category: filter });

  if (!productList) return res.status(500).send("No products found");

  res.send(productList);
};

const handleGetOne = async (req, res) => {
  const productList = await Product.findById(req.params.id).populate(
    "category"
  );
  if (!productList) return res.status(500).send("Product not Found");
  else res.send(productList);
};

const handlePost = async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid Category");

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescirption: req.body.richDescirption,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    rating: req.body.rating,
    dateCreated: req.body.dateCreated,
  });
  product
    .save()
    .then((createdProduct) => {
      // res.status(201).json(createdProduct);
      if (!createdProduct)
        return res
          .status(400)
          .json({ message: "Error creating product...", success: false });

      return res.status(201).json(createdProduct);
    })
    .catch((e) => {
      res.status(500).json({ error: e, success: false });
    });
};

const handlePut = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid Category");
  const newproduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescirption: req.body.richDescirption,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      rating: req.body.rating,
    },
    { new: true }
  );

  if (!newproduct)
    return res
      .status(500)
      .json({ success: false, message: "Error updating the product" });

  res.send(newproduct);
};

const handleDelete = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ success: true, message: "Deleted" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "Error deleting the category" });
    });
};

const getCount = async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) return res.status(500).json({ success: false });

  res.send({
    count: productCount,
  });
};

module.exports = {
  handleGet,
  handlePost,
  handleGetOne,
  handlePut,
  handleDelete,
  getCount,
};
