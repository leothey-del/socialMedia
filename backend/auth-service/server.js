const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.GATEWAY_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));

// Handle preflight requests
app.options('*', cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/login', (req, res) => {
  // Your login logic here
  res.json({ success: true, message: 'Login successful' });
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'Auth service healthy',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});