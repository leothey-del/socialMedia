const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Gateway OK' });
});

// Auth Service Proxy
app.use('/api/login', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/api/login': '/api/login' },
  logLevel: 'debug'
}));

// Posts Service Proxy
app.use('/api/posts', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: { '^/api/posts': '/api/posts' },
  logLevel: 'debug'
}));

// Error handling
app.use((err, req, res, next) => {
  console.error('Gateway error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.GATEWAY_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
  console.log(`Auth service: http://localhost:5001`);
  console.log(`Posts service: http://localhost:5002`);
});