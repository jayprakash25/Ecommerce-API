const express = require("express");
const router = express.Router();
const {
  handleGet,
  handlePost,
  handleGetOne,
} = require("../controller/products");

router.route("/").get(handleGet).post(handlePost);

router.route("/:id").get(handleGetOne);

module.exports = router;
