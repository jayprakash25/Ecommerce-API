const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const handleGet = async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList || userList.length == 0)
    return res.status(500).send("No users found");

  res.send(userList);
};

const handleGetOne = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid User, User not found.");
  const userList = await User.findById(req.params.id).select("-passwordHash");
  if (!userList) return res.status(500).send("Product not Found");
  else res.send(userList);
};

const handlePost = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user
    .save()
    .then((newUser) => {
      // res.status(201).json(createdProduct);
      if (!newUser)
        return res
          .status(400)
          .json({ message: "Error creating product...", success: false });

      return res.status(201).send(newUser);
    })
    .catch((e) => {
      res.status(500).json({ error: e, success: false });
      console.log(e);
    });
};

const handleLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);

  if (!user) return res.status(400).send("User not Found.");

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign({ userId: user._id }, process.env.secret, {
      expiresIn: "1d",
    });

    res.status(201).send({ user: user.email, token: token });
  } else {
    res.status(400).send("Invalid password, Try Again");
  }
};

module.exports = { handleGet, handlePost, handleGetOne, handleLogin };
