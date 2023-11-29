const express = require("express");
const router = express.Router();
const {
  handlePost,
  handleGet,
  handleDelete,
  handlePut,
} = require("../controller/categories");

router.route("/").get(handleGet).post(handlePost);

router.route("/:id").put(handlePut).delete(handleDelete);

module.exports = router;
