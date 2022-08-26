const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// const registerUser = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: "Register User" });
// });

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check if user email exists, and if password matches to hashed password in mongoDB
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      lastLogin: user.lastLogin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//Update user details after first login
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get user data" });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  getMe,
};
