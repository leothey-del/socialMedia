const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// =================================================================
// --- NEW DIAGNOSTIC LOGS ---
console.log("--- GATEWAY STARTUP VARIABLES ---");
console.log("GATEWAY: FRONTEND_URL:", FRONTEND_URL);
console.log("GATEWAY: Target for Auth Service:", AUTH_SERVICE_URL);
console.log("GATEWAY: Target for Posts Service:", POSTS_SERVICE_URL);
console.log("---------------------------------");
// =================================================================

if (!AUTH_SERVICE_URL || !POSTS_SERVICE_URL || !FRONTEND_URL) {
    console.error("Error: Required environment variables are not set.");
    process.exit(1); 
}

const app = express();
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// --- Health Check ---
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Gateway OK' });
});

// --- Proxies ---
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '/' },
    logLevel: 'debug'
}));
app.use('/api/posts', createProxyMiddleware({
    target: POSTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/posts': '/' },
    logLevel: 'debug'
}));

app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});