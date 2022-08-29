const express = require("express");
const router = express.Router();
const {
  updateUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.put("/:id", updateUser);
router.post("/login", loginUser);
router.get("/me", getMe);

module.exports = router;
