import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MONGODB_URI, corsOptions } from './config.js';

// Import routes
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});