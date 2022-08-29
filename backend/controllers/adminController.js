const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  if (req.user.accountType !== "admin") {
    res.status(401);
    throw new Error("Not authorized, insufficient credentials");
  }

  const { id, email, firstName, lastName } = req.body;

  if (email) {
    const users = await User.find({ email: req.body.email });
    res.status(200).json(users);
  } else if (firstName) {
    const users = await User.find({ firstName: req.body.firstName });
    res.status(200).json(users);
  } else if (lastName) {
    const users = await User.find({ lastName: req.body.lastName });
    res.status(200).json(users);
  } else if (id) {
    const users = await User.findById(id);
    res.status(200).json(users);
  } else {
    const users = await User.find();
    res.status(200).json(users);
  }
});

const setUser = asyncHandler(async (req, res) => {
  if (req.user.accountType !== "admin") {
    res.status(401);
    throw new Error("Not authorized, insufficient credentials");
  }

  //Check wether all fields are populated
  const userProps = req.body;
  for (let prop in userProps) {
    if (!userProps[prop]) {
      res.status(400);
      throw new Error(`Please fill in the ${prop} field`);
    }
  }

  const { email, password } = req.body;

  //Verify if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create new user
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
    password: hashedPassword,
    accountType: req.body.accountType,
  });

  //Check if user was created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.firstName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.accountType !== "admin") {
    res.status(401);
    throw new Error("Not authorized, insufficient credentials");
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ id: req.params.id });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getUsers,
  setUser,
  deleteUser,
};
