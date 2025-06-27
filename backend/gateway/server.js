// --- THIS IS THE CRUCIAL LINE ---
// It MUST be at the very top to load your .env file
require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Now, these variables will be loaded correctly from your .env file
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// This check will now pass
if (!AUTH_SERVICE_URL || !POSTS_SERVICE_URL || !FRONTEND_URL) {
    console.error("Error: Make sure all required variables are in your .env file.");
    process.exit(1); 
}

const app = express();

// --- CORS will use http://localhost:5173 from your .env file ---
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

// --- Health Check ---
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Gateway OK' });
});

// --- Proxies will use the URLs from your .env file ---
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

// --- Error Handling ---
app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// --- Port will be 5000 from your .env file ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
    console.log(`Proxying to Auth Service at: ${AUTH_SERVICE_URL}`);
    console.log(`Proxying to Posts Service at: ${POSTS_SERVICE_URL}`);
});