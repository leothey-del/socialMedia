const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// --- Configuration ---
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 5000;

// --- Safety Check ---
if (!AUTH_SERVICE_URL || !POSTS_SERVICE_URL || !FRONTEND_URL) {
    console.error("Error: Missing Environment Variables.");
    process.exit(1); 
}

const app = express();

// --- Middleware ---
app.use(cors({ 
  origin: [FRONTEND_URL, 'https://social-media-lyart-two.vercel.app', 'http://localhost:3000'],
  credentials: true 
}));

// Enable pre-flight across-the-board
app.options('*', cors()); 

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

// --- Health Check ---
app.get('/health', (req, res) => res.status(200).json({ status: 'Gateway OK' }));

// --- API Proxies (REMOVED pathRewrite) ---

// This sends /api/auth/login EXACTLY as it is to the Auth service
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    logLevel: 'debug' 
}));

// This sends /api/posts EXACTLY as it is to the Posts service
app.use('/api/posts', createProxyMiddleware({
    target: POSTS_SERVICE_URL,
    changeOrigin: true,
    logLevel: 'debug'
}));

// --- Error Handling ---
app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
    console.log(`-> Proxying to Auth Service at: ${AUTH_SERVICE_URL}`);
});
