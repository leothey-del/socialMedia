const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Only run dotenv in a development environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// These variables will now come from Render's Environment Group in production
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// This check will now use the production variables on Render
if (!AUTH_SERVICE_URL || !POSTS_SERVICE_URL || !FRONTEND_URL) {
    console.error("Error: Required environment variables are not set. Check your Render Environment Group.");
    process.exit(1); 
}

const app = express();

// CORS will use the live Vercel URL from your Render secrets in production
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

// --- Health Check ---
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Gateway OK' });
});

// --- Proxies will use the live internal service URLs from Render ---
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

// Port will be provided by Render in production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
    console.log(`Proxying to Auth Service at: ${AUTH_SERVICE_URL}`);
    console.log(`Proxying to Posts Service at: ${POSTS_SERVICE_URL}`);
});