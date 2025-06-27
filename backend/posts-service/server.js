const express = require("express");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(express.json());

// --- Database Connection ---
const dbUri = process.env.MONGO_URI;
if (!dbUri) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  process.exit(1);
}
mongoose.connect(dbUri)
  .then(() => console.log("Posts-Service: MongoDB connection successful."))
  .catch((err) => {
    console.error("Posts-Service: MongoDB connection error:", err);
    process.exit(1);
  });

// --- Health Check (Moved to the top) ---
app.get("/health", (req, res) => {
    res.status(200).json({ status: 'Posts-Service is running' });
});

// --- Main Routes (Now second) ---
app.use("/", require("./routes/userPostRoute"));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Posts Service running on port ${PORT}`));