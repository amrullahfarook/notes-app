asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "get notes" });
});

const setNote = asyncHandler(async (req, res) => {
  noteProps = req.body;
  for (let prop in noteProps) {
    if (!noteProps[prop]) {
      res.status(400);
      throw new Error(`Please fill in the ${prop} field`);
    }
  }

  res.status(200).send({ message: "set notes" });
});

const deleteNote = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `deleted note: ${req.params.id}` });
});

const updateNote = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `updated note: ${req.params.id}` });
});

module.exports = {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
};
