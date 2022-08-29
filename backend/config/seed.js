const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const User = require("../models/userModel");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((err) => {
    console.log(err);
  });

const email = "admin@gmail.com";
const password = "12345";

console.log("Running MongoDB seed...");

const seedDB = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.create({
    firstName: "admin",
    lastName: "user",
    email: "admin@gmail.com",
    dateOfBirth: new Date(2000, 1, 1),
    mobile: "2025550170",
    password: hashedPassword,
    accountType: "admin",
    status: "active",
  });
};

console.log(
  `Seed has been completed! Password for initial admin account:
   email: ${email}
   password: ${password}`
);

seedDB().then(() => {
  mongoose.connection.close();
});
