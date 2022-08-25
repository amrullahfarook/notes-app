asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "get users" });
});

const setUser = asyncHandler(async (req, res) => {
  noteProps = req.body;
  for (let prop in noteProps) {
    if (!noteProps[prop]) {
      res.status(400);
      throw new Error(`Please fill in the ${prop} field`);
    }
  }

  res.status(200).send({ message: "set user" });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `deleted user: ${req.params.id}` });
});

module.exports = {
  getUsers,
  setUser,
  deleteUser,
};
