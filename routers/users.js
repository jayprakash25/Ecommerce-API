const express = require("express");
const router = express.Router();
const {
  handleGet,
  handlePost,
  handleGetOne,
  handleLogin,
  getCount,
} = require("../controller/users");

router.route("/").get(handleGet);
router.route("/register").post(handlePost);
router.route("/:id").get(handleGetOne);
router.route("/login").post(handleLogin);
router.route("/get/count").get(getCount);

module.exports = router;
