const express = require("express");
const router = express.Router();
const {
  handleGet,
  handlePost,
  handleGetOne,
  handlePut,
  handleDelete,
  getCount,
} = require("../controller/products");

router.route("/").get(handleGet).post(handlePost);

router.route("/:id").get(handleGetOne).put(handlePut).delete(handleDelete);

router.route("/get/count").get(getCount);

module.exports = router;
