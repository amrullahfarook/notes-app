const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  deleteUser,
} = require("../controllers/adminController");

// router.route("/").get(console.log("get notes"));
router.route("/").get(getUsers).post(setUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
