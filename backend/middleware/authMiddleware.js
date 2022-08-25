const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Check for Bearer token in request headers

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get the token from request header
      token = req.headers.authorization.split(" ")[1];

      //Verfiy token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Setting user by user ID in token, without obtaining the hashed password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  //Not Bearer token in request authorization header

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
