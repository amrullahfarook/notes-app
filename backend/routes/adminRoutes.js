const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  deleteUser,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUsers).post(protect, setUser);
router.route("/:id").delete(protect, deleteUser);

module.exports = router;
