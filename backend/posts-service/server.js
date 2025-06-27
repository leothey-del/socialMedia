const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the .env file for local development
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// --- Database Connection ---
const dbUri = process.env.MONGO_URI;

if (!dbUri) {
  console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
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
// The path "/" now correctly matches the request sent from your gateway.
// The gateway strips "/api/posts", leaving just "/" which is then handled by your userPostRoute.
app.use("/", require("./routes/userPostRoute"));

// --- Health Check (Good Practice) ---
app.get("/health", (req, res) => {
    res.status(200).json({ status: 'Posts-Service is running' });
});

// Use the PORT variable provided by Render, with a fallback for local dev
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Posts Service running on port ${PORT}`));