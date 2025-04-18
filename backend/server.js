import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import errorHandler from './middlewares/error.middleware.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(express.json()); // Parse JSON request bodies

// Test route
app.get('/', (req, res) => {
    res.send('TODO API is running...');
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// Global error handler
app.use(errorHandler)


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})