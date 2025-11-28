const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/LearneaseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const User = require("./userModel");

const JWT_SECRET = "your_secret_key_here";  
// ❗ Change this to environment variable in production

// Home Test Route
app.get("/", (req, res) => {
  res.send("API is working");
});


// =========================
//   AUTH MIDDLEWARE
// =========================
function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // attach user data
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


// =========================
//         SIGNUP
// =========================
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // Set true in production (HTTPS)
      sameSite: "lax",
    });

    res.json({ message: "Signup successful", user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =========================
//          LOGIN
// =========================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ message: "Incorrect password" });

    // Create JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token to cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =========================
//          LOGOUT
// =========================
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});


// =========================
//   PROTECTED USER ROUTE
// =========================
app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});


// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
