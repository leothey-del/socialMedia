const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Use direct service URLs from environment
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE_URL || 'http://localhost:5002';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = express();

// Enhanced CORS configuration
app.use(cors({ 
  origin: [FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'Gateway OK',
    authService: AUTH_SERVICE_URL,
    postsService: POSTS_SERVICE_URL
  });
});

// Auth service proxy
app.use('/api/auth', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' },
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('Auth proxy error:', err);
    res.status(500).json({ error: 'Auth service unavailable' });
  }
}));

// Posts service proxy
app.use('/api/posts', createProxyMiddleware({
  target: POSTS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/posts': '' },
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('Posts proxy error:', err);
    res.status(500).json({ error: 'Posts service unavailable' });
  }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
  console.log(`Proxying to Auth Service at: ${AUTH_SERVICE_URL}`);
  console.log(`Proxying to Posts Service at: ${POSTS_SERVICE_URL}`);
});