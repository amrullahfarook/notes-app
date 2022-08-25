asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json(notes);
});

const setNote = asyncHandler(async (req, res) => {
  noteProps = req.body;
  for (let prop in noteProps) {
    if (!noteProps[prop]) {
      res.status(400);
      throw new Error(`Please fill in the ${prop} field`);
    }
  }

  const note = await Note.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
  });

  res.status(200).json(note);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  //Check if note exists
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check wether user logged in matches the note's user
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await note.remove();

  res.status(200).json({ id: req.params.id });
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check wether user logged in matches the note's user
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

module.exports = {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
};
