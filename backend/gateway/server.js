const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// --- Configuration ---
// Get the full service URLs and frontend URL directly from the .env file
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 5000;

// --- Safety Check ---
// Verify that all required environment variables are loaded
if (!AUTH_SERVICE_URL || !POSTS_SERVICE_URL || !FRONTEND_URL) {
    console.error("Error: Required AUTH_SERVICE_URL, POSTS_SERVICE_URL, or FRONTEND_URL environment variables are not set in your .env file.");
    process.exit(1); 
}

// --- App Initialization ---
const app = express();

// --- Middleware ---
app.use(cors({ 
  // Make sure your frontend URL from the .env is included here if it's different
  origin: [FRONTEND_URL, 'https://social-media-lyart-two.vercel.app', 'http://localhost:3000'],
  credentials: true 
}));

// Enable pre-flight across-the-board
app.options('*', cors()); 

// Logging middleware to see incoming requests
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

// --- Health Check Route ---
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Gateway OK' });
});

// --- API Proxies ---
// Proxy requests for /api/auth to the authentication service
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }, 
    logLevel: 'debug' // Use 'info' or 'silent' for less verbose logging
}));

// Proxy requests for /api/posts to the posts service
app.use('/api/posts', createProxyMiddleware({
    target: POSTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/posts': '' },
    logLevel: 'debug'
}));

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
    console.log(`-> Proxying to Auth Service at: ${AUTH_SERVICE_URL}`);
    console.log(`-> Proxying to Posts Service at: ${POSTS_SERVICE_URL}`);
    console.log(`-> Allowing requests from: ${FRONTEND_URL}`);
});