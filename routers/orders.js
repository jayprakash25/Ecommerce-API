const express = require("express");
const router = express.Router();
const {
  handleGet,
  handlePost,
  handleStatus,
  handleDelete,
} = require("../controller/orders");
const { handleGetOne } = require("../controller/orders");

router.route("/").get(handleGet).post(handlePost);

router.route("/:id").get(handleGetOne).put(handleStatus).delete(handleDelete);

module.exports = router;
