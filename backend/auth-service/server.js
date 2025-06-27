import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// --- CORS Configuration ---
// It's good practice to get this from environment variables in production
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());


// --- Database Connection ---
// This connects to the database as soon as the function is initialized.
// Vercel can reuse this connection for subsequent "warm" requests for better performance.
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected successfully on initial load.');
} catch (err) {
  console.error('Initial MongoDB connection error:', err.message);
  // We don't exit here, to allow the health check to still respond
}


// --- Routes ---
// For a serverless function, you must export the app as the default.
// Vercel will pass the incoming request to this exported app.

// Test Login Route
app.post('/api/auth/login', (req, res) => {
  res.json({ 
    success: true,
    message: 'Login successful (Vercel)',
    timestamp: new Date().toISOString()
  });
});

// Health Check Route
app.get('/api/auth/health', (req, res) => {
  res.json({
    status: 'healthy',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// IMPORTANT: This is the ES Module equivalent of module.exports = app;
export default app;