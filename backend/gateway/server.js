const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:10000';
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL || 'http://localhost:10001';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = express();

// Enhanced CORS
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health endpoint with service verification
app.get('/health', async (req, res) => {
  try {
    const authHealth = await fetch(`${AUTH_SERVICE_URL}/health`).then(r => r.json());
    const postsHealth = await fetch(`${POSTS_SERVICE_URL}/health`).then(r => r.json());
    
    res.status(200).json({
      gateway: 'OK',
      authService: authHealth,
      postsService: postsHealth
    });
  } catch (err) {
    res.status(500).json({
      gateway: 'OK',
      error: `Service connection failed: ${err.message}`
    });
  }
});

// Proxies with error handling
app.use('/api/auth', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' },
  onError: (err, req, res) => {
    console.error('Auth Service Proxy Error:', err);
    res.status(502).json({ error: 'Cannot connect to Auth Service' });
  }
}));

app.use('/api/posts', createProxyMiddleware({
  target: POSTS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/posts': '' },
  onError: (err, req, res) => {
    console.error('Posts Service Proxy Error:', err);
    res.status(502).json({ error: 'Cannot connect to Posts Service' });
  }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  Gateway Service Running
  Port: ${PORT}
  Auth Service: ${AUTH_SERVICE_URL}
  Posts Service: ${POSTS_SERVICE_URL}
  Frontend URL: ${FRONTEND_URL}
  `);
});