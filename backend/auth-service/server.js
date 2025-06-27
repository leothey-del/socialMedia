const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Only run dotenv in a development environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// Enhanced Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.GATEWAY_URL || 'http://localhost:5000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));

// --- Database Connection ---
const dbUri = process.env.MONGO_URI;

if (!dbUri) {
  console.error("FATAL ERROR: MONGO_URI is not defined");
  process.exit(1);
}

// Improved MongoDB connection with retry logic
const connectWithRetry = () => {
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
  })
  .then(() => console.log("Auth-Service: MongoDB connection successful"))
  .catch(err => {
    console.error("MongoDB connection failed, retrying in 5 seconds...", err);
    setTimeout(connectWithRetry, 5000);
  });
};
connectWithRetry();

// Enhanced health check endpoint
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ 
    status: 'Auth-Service is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Auth Service Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Get the port from environment variables
const PORT = process.env.PORT || 10000; // Changed to match render.yaml

const server = app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
  console.log(`Allowed gateway: ${process.env.GATEWAY_URL || 'http://localhost:5000'}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});