const express = require("express");
const router = express.Router();
const {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
} = require("../controllers/userController");

// router.route("/").get(console.log("get notes"));
router.route("/").get(getNotes).post(setNote);
router.route("/:id").delete(deleteNote).put(updateNote);

module.exports = router;
