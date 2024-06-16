const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  createOrUpdateSubtasks,
  updateSubtasks,
  deleteSubtasks,
  getSubtasks,
} = require("../controller/taskController");

const router = express.Router();

// Task CRUD routes
router.post("/tasks", createTask);
router.get("/tasks/:username", getTasks);
router.put("/tasks/:username/:taskId", updateTask);
router.delete("/tasks/:username/:taskId", deleteTask);

// Subtask CRUD routes
router.post("/subtasks", createOrUpdateSubtasks);
router.put("/subtasks/:username/:taskId", updateSubtasks);
router.delete("/subtasks/:username/:taskId", deleteSubtasks);
router.get("/subtasks/:username/:taskId", getSubtasks);

module.exports = router;
