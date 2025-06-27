// C:\Users\Lee\Downloads\codes\2025\social\socialMedia\backend\auth-service\server.js
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

// Check if the database URI is provided. If not, log an error and exit.
if (!dbUri) {
  // Updated error message to be more accurate
  console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
  process.exit(1); // Exit the application with a failure code
}

// Connect to MongoDB
mongoose.connect(dbUri)
  .then(() => console.log("Auth-Service: MongoDB connection successful."))
  .catch(err => {
    console.error("Auth-Service: MongoDB connection error:", err);
    process.exit(1); // Exit on connection failure
  });

// --- Routes ---
// This path now correctly matches the request sent from your gateway
app.use("/login", require("./routes/login"));

// A simple health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: 'Auth-Service is running' });
});


// Get the port from environment variables, with a default fallback
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));