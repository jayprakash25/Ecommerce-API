const Product = require("../models/product");
const { Category } = require("../models/category");

const handleGet = async (req, res) => {
  const productList = await Product.find();
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
    // images: req.body.images,
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

module.exports = { handleGet, handlePost, handleGetOne };
