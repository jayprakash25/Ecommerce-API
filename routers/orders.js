const express = require("express");
const router = express.Router();
const { handleGet, handlePost } = require("../controller/orders");
const { handleGetOne } = require("../controller/orders");

router.route("/").get(handleGet).post(handlePost);

router.route("/:id").get(handleGetOne);

module.exports = router;
