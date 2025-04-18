import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controllers.js';

const router = express.Router();


// Apply protect middleware to all routes in this router
router.use(authMiddleware)

// Create new task
router.post('/add', createTask);

// Get tasks with filters, search and pagination
router.get('/', getTasks);

// Update task
router.put('/:id', updateTask);

// Delete task
router.delete('/:id', deleteTask)

export default router