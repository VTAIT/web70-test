import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //   1. Check authentication
  const existingUser = await UserModel.findOne({ username });
  console.log(existingUser);
  if (!existingUser) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // 2. Check password

  if (password !== existingUser.password) {
    res.status(401);
    throw new Error("Username or password is not correct!");
  }

  // Create JWT Token & Response to client
  const jwtPayload = {
    username: existingUser.username,
  };

  const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    accessToken: token,
    message: "Login successfully",
  });
});

const AuthController = {
  login,
};

export default AuthController;
