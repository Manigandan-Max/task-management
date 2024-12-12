import { Router } from "express";
import { register, login } from "../controllers/authController";
import * as taskController from '../controllers/taskController';
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Create a task
router.post('/createtasks', authenticateJWT, taskController.createTask);

// Get all tasks
router.get('/tasks', authenticateJWT, taskController.getTasks);

// Update a task
router.put('/updatetasks/:id', authenticateJWT, taskController.updateTask);

// Delete a task
router.delete('/deletetasks/:id', authenticateJWT, taskController.deleteTask);

// Get task status count
router.get('/getCount/:id', authenticateJWT, taskController.getTaskCount);

export default router;