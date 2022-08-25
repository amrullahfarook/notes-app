asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const setUser = asyncHandler(async (req, res) => {
  userProps = req.body;
  for (let prop in userProps) {
    if (!userProps[prop]) {
      res.status(400);
      throw new Error(`Please fill in the ${prop} field`);
    }
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
    password: req.body.password,
    accountType: req.body.accountType,
    lastLogin: req.body.lastLogin,
  });

  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUsers,
  setUser,
  deleteUser,
};
