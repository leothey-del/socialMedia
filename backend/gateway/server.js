const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const INIT_DELAY = parseInt(process.env.INIT_DELAY_MS) || 30000;

// Lightweight CORS config
app.use(cors({
  origin: process.env.FRONTEND_URL?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS']
}));

// Startup delay middleware
let isReady = false;
setTimeout(() => { isReady = true }, INIT_DELAY);

// Simplified health check
app.get('/health', (req, res) => {
  if (!isReady) return res.status(503).json({ status: 'STARTING' });
  res.status(200).json({ 
    status: 'OK',
    services: {
      auth: process.env.AUTH_SERVICE_URL,
      posts: process.env.POSTS_SERVICE_URL
    }
  });
});

// Proxies with readiness check
app.use(['/api/auth', '/api/posts'], (req, res, next) => {
  if (!isReady) return res.status(503).json({ error: 'Service starting' });
  next();
});

app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' }
}));

app.use('/api/posts', createProxyMiddleware({
  target: process.env.POSTS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/posts': '' }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Gateway started on port ${PORT}`);
  console.log(`Will be ready in ${INIT_DELAY/1000} seconds...`);
});