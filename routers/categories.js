const express = require("express");
const router = express.Router();
const {
  handlePost,
  handleGet,
  handleDelete,
} = require("../controller/categories");

router.route("/").get(handleGet).post(handlePost);

router.route("/:id").delete(handleDelete);

module.exports = router;
