const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Get the separate host and port from Render's environment
const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST;
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT;
const POSTS_SERVICE_HOST = process.env.POSTS_SERVICE_HOST;
const POSTS_SERVICE_PORT = process.env.POSTS_SERVICE_PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Construct the full, valid URLs inside the code
const AUTH_SERVICE_URL = `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`;
const POSTS_SERVICE_URL = `http://${POSTS_SERVICE_HOST}:${POSTS_SERVICE_PORT}`;

// The safety check
if (!AUTH_SERVICE_HOST || !POSTS_SERVICE_HOST || !FRONTEND_URL) {
    console.error("Error: Required service host or frontend URL environment variables are not set.");
    process.exit(1); 
}

const app = express();

app.use(cors({ 
  origin: ['https://social-media-lyart-two.vercel.app', 'http://localhost:3000'],
  credentials: true 
}));

app.options('*', cors()); // Add this right after the cors() middleware

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Gateway OK' });
});

// --- Proxies ---
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    // FIX: Use an empty string '' to prevent double slashes
    pathRewrite: { '^/api/auth': '' }, 
    logLevel: 'debug'
}));

app.use('/api/posts', createProxyMiddleware({
    target: POSTS_SERVICE_URL,
    changeOrigin: true,
    // FIX: Use an empty string '' to prevent double slashes
    pathRewrite: { '^/api/posts': '' },
    logLevel: 'debug'
}));

app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
    console.log(`Proxying to Auth Service at: ${AUTH_SERVICE_URL}`);
    console.log(`Proxying to Posts Service at: ${POSTS_SERVICE_URL}`);
});