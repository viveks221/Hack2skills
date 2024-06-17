const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

// Middleware to parse JSON bodies
router.use(express.json());

// Get all tasks for a user
router.get("/tasks/:username", taskController.getAllTasks);

// Create a new task
router.post("/tasks", taskController.createTask);

// Update a task
router.put("/tasks/:taskId", taskController.updateTask);

// Soft delete a task
router.delete("/tasks/:taskId", taskController.deleteTask);

// Get all subtasks for a task
router.get("/tasks/:taskId/subtasks", taskController.getSubtasks);

// Update multiple subtasks for a task
router.put("/tasks/:taskId/subtasks", taskController.updateSubtasks);

module.exports = router;
