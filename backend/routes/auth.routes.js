import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controllers.js';

const router = express.Router();

// Register route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', logoutUser);

export default router