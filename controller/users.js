const { User } = require("../models/user");

const handleGet = async (req, res) => {
  const userList = await User.find();

  if (!userList || userList.length == 0)
    return res.status(500).send("No users found");

  res.send(userList);
};

const handlePost = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
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

module.exports = { handleGet, handlePost };
