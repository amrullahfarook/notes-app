const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add your last name"],
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please add your date of birth"],
  },
  mobile: {
    type: Number,
    required: [true, "Please add your mobile number"],
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
  },
  accountType: {
    type: String,
    required: [true, "Please enter your account type"],
  },
  firstLogin: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
