const express = require("express");
const router = express.Router();
const {
  handleGet,
  handlePost,
  handleGetOne,
  handleLogin,
} = require("../controller/users");

router.route("/").get(handleGet);
router.route("/register").post(handlePost);
router.route("/:id").get(handleGetOne);
router.route("/login").post(handleLogin);

module.exports = router;
