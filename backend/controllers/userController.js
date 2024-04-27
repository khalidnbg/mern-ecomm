const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  // check password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  // check if user already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }
  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // generate Token
  const token = generateToken(user._id);

  if (user) {
    const { _id, name, email, role } = user;

    // send the cookie to the frontend
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 86400),
      // secure: true,
      // sameSite: none,
    });
    // send user data
    res.status(201).json({
      _id,
      name,
      email,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("user Does not exist");
  }

  // user exists, now check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // generate token
  const token = generateToken(user._id);

  // if all fields are correct
  if (user && passwordIsCorrect) {
    // do not send password
    const newUser = await User.findOne({ email }).select("-password");

    // send the cookie to the frontend
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 86400),
      // secure: true,
      // sameSite: none,
    });
    // send user data
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out successfully" });
});

// Get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// get login status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  // verify the token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    res.json(true);
  } else {
    res.json(false);
  }
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
  // get access to user
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// update Photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;

  const user = await User.findById(req.user._id);
  user.photo = photo;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
