const express = require("express");
const router = express.Router();
const {
  handleGet,
  handlePost,
  handleGetOne,
  handlePut,
  handleDelete,
} = require("../controller/products");

router.route("/").get(handleGet).post(handlePost);

router.route("/:id").get(handleGetOne).put(handlePut).delete(handleDelete);

module.exports = router;
