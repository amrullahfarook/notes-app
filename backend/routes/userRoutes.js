const express = require("express");
const router = express.Router();
const { loginUser, getMe } = require("../controllers/userController");

router.post("/login", loginUser);
router.get("/me", getMe);

module.exports = router;
