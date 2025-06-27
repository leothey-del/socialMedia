const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 10000;
const INIT_DELAY = parseInt(process.env.INIT_DELAY_MS) || 15000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check with startup delay
let dbReady = false;
app.get('/health', (req, res) => {
  const status = dbReady ? 200 : 503;
  res.status(status).json({ 
    status: dbReady ? 'OK' : 'STARTING',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'connecting'
  });
});

// DB connection with retry
const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true
  })
  .then(() => {
    dbReady = true;
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('DB connection failed:', err.message);
    setTimeout(connectDB, 5000);
  });
};
connectDB();

// Routes
app.post('/login', (req, res) => {
  if (!dbReady) return res.status(503).json({ error: 'Service starting' });
  // Your login logic here
  res.json({ status: 'Login endpoint' });
});

app.listen(PORT, () => {
  console.log(`Auth service started on port ${PORT}`);
  setTimeout(() => {
    if (dbReady) console.log('Service fully operational');
  }, INIT_DELAY);
});