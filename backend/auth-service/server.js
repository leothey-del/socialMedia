// C:\Users\Lee\Downloads\codes\2025\social\socialMedia\backend\auth-service\server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Database Connection ---
// Get the database URI from environment variables
const dbUri = process.env.MONGO_URI;

// Check if the database URI is provided. If not, log an error and exit.
if (!dbUri) {
  console.error("FATAL ERROR: AUTH_DB_URI is not defined in the .env file.");
  process.exit(1); // Exit the application with a failure code
}

// Connect to MongoDB Atlas
mongoose.connect(dbUri)
  .then(() => console.log("MongoDB connection successful."))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit on connection failure
  });

// --- Routes ---
// Note: Ensure the './routes/login' file exists and is correctly set up.
app.use("/api/login", require("./routes/login"));
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: 'Auth service is running' });
});


// Get the port from environment variables, with a default fallback
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
