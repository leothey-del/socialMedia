const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Gateway healthy' });
});

// Auth Service Proxy
app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('x-forwarded-host', process.env.FRONTEND_URL);
  },
  xfwd: true
}));

// Posts Service Proxy
app.use('/api/posts', createProxyMiddleware({
  target: process.env.POSTS_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/posts': '' },
  xfwd: true
}));

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
  console.log(`Proxying auth to: ${process.env.AUTH_SERVICE_URL}`);
  console.log(`Proxying posts to: ${process.env.POSTS_SERVICE_URL}`);
});