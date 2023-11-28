const express = require("express");
const router = express.Router();
const { handleGet, handlePost } = require("../controller/products");

router.route("/").get(handleGet).post(handlePost);

module.exports = router;
