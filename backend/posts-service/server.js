const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

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
  console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
  process.exit(1); // Exit the application with a failure code
}

// Connect to MongoDB
mongoose
  .connect(dbUri)
  .then(() => console.log("MongoDB connection successful."))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit on connection failure
  });

// Routes
app.use("/api/posts", require("./routes/userPostRoute"));

const PORT = process.env.POSTS_SERVICE_PORT || 5002;
app.listen(PORT, () => console.log(`Posts Service running on port ${PORT}`));