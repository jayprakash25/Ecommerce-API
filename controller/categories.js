const { Category } = require("../models/category");

const handleGet = async (req, res) => {
  const categoryList = await Category.find();
  res.send(categoryList);
};

const handlePost = async (req, res) => {
  let newCat = new Category({
    name: req.body.name,
    color: req.body.color,
    image: req.body.image,
  });

  newCat = await newCat.save();

  if (!newCat) return res.status(404).send("Error creating the category...");

  return res.send(newCat);
};

const handlePut = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category)
    return res
      .status(400)
      .json({ success: false, message: "Error updating category" });

  res.send(category);
};

const handleDelete = (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ success: true, message: "Deleted" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "Error deleting the category" });
    });
};

module.exports = { handlePost, handleGet, handleDelete, handlePut };
