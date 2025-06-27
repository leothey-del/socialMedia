const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password }); // Log the incoming credentials

    const user = await User.findOne({ username });
    console.log("Found user:", user); // Log the found user (or null)

    if (!user || password !== user.password) {
      console.log("Login failed - invalid credentials");
      return res.status(401).json({ error: "Invalid username or password" });
    }

   

    res.status(200).json({
      message: "Login successful",
      token: "dummy-token",  // You can generate a real token later!
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture || "https://via.placeholder.com/40",
      },
    });
   
  } catch (error) {
    console.error("Backend login error:", error);
    res.status(500).json({ error: error.message || "Failed to login" });
  }
});

module.exports = router;
