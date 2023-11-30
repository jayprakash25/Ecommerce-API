const express = require("express");
const router = express.Router();
const {
  handleGet,
  handlePost,
  handleGetOne,
  handleLogin,
  getCount,
  handleDelete,
} = require("../controller/users");

router.route("/").get(handleGet);
router.route("/register").post(handlePost);
router.route("/:id").get(handleGetOne).delete(handleDelete);
router.route("/login").post(handleLogin);
router.route("/get/count").get(getCount);

module.exports = router;
