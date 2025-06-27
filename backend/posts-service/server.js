const express = require("express");
const mongoose = require("mongoose");

// Only run dotenv in a development environment.
// In production (on Render), variables will come from the Environment Group.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// Middleware
app.use(express.json());

// --- Database Connection ---
const dbUri = process.env.MONGO_URI;

if (!dbUri) {
  console.error("FATAL ERROR: MONGO_URI is not defined. Check your Render Environment Group.");
  process.exit(1); // Exit the application with a failure code
}

mongoose
  .connect(dbUri)
  .then(() => console.log("Posts-Service: MongoDB connection successful."))
  .catch((err) => {
    console.error("Posts-Service: MongoDB connection error:", err);
    process.exit(1); // Exit on connection failure
  });

// --- Routes ---
// The path "/" correctly matches the request sent from your gateway.
app.use("/", require("./routes/userPostRoute"));

// --- Health Check (Good Practice) ---
app.get("/health", (req, res) => {
    res.status(200).json({ status: 'Posts-Service is running' });
});

// Use the PORT variable provided by Render, with a fallback for local dev
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Posts Service running on port ${PORT}`));