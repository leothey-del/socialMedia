import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userPostRoute from './routes/userPostRoute.js'; // Use .js extension for ES Modules

const app = express();

// --- CORS Configuration ---
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
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Posts-Service: MongoDB connected successfully on initial load.');
} catch (err) {
  console.error('Posts-Service: Initial MongoDB connection error:', err.message);
}


// --- Routes ---
// It's good practice to include the base path here
app.use('/api/posts', userPostRoute);

// Health Check Route
app.get('/api/posts/health', (req, res) => {
  res.json({
    status: 'healthy',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});


// IMPORTANT: Export the app for Vercel to use
export default app;