import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {Router} from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

dotenv.config();

const router = Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({username : req.body.username});

    if (existingUser) {
      return res.status(400).json({
        message : "Username already taken. Please choose another one.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User instance
    const newUser = new User({
      username : req.body.username,
      password : hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json(
        {message : "Registration successful", userId : newUser._id});
  } catch (error) {
    res.status(500).json({message : "Server error during registration."});
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findOne({username : req.body.username});

    if (!user) {
      return res.status(400).json({
        message :
            "Username not found. Please register or try another username.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid =
        await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json(
          {message : "Invalid password. Please try again."});
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {
      expiresIn : "1h",
    });

    res.status(200).json(
        {message : "Login successful", token : token, userId : user._id});
  } catch (error) {
    res.status(500).json({message : "Server error during login."});
  }
});

export default router;
