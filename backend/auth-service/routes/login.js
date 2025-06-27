// ==========================================================
// --- TEMPORARY TEST CODE for backend/auth-service/routes/login.js ---
// ==========================================================
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // We are NOT talking to the database.
    // We are just checking if the route itself works.
    console.log("LOGIN ROUTE HIT! Bypassing database and sending success.");

    res.status(200).json({
      message: "Login route test successful!",
      token: "test-token-123",
      user: {
        _id: "testuser",
        username: "testuser",
      },
    });
  } catch (error) {
    console.error("Error in temporary test route:", error);
    res.status(500).json({ error: "Error in test route" });
  }
});

module.exports = router;