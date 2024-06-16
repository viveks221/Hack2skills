const User = require("../models/user");

// Helper function to exclude deleted tasks/subtasks
const filterDeleted = (tasks) => {
  return tasks
    .filter((task) => !task.deleted)
    .map((task) => {
      const subtasks = task.subtasks.filter((subtask) => !subtask.deleted);
      return { ...task._doc, subtasks };
    });
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { username, task } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, tasks: [] });
    }
    user.tasks.push(task);
    await user.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const tasks = filterDeleted(user.tasks);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { username, taskId } = req.params;
    const update = req.body.task;
    const user = await User.findOneAndUpdate(
      { username, "tasks._id": taskId },
      { $set: { "tasks.$": { ...update, _id: taskId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User or task not found");
    }
    res.status(200).send(user.tasks.id(taskId));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Soft delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { username, taskId } = req.params;
    const user = await User.findOneAndUpdate(
      { username, "tasks._id": taskId },
      { $set: { "tasks.$.deleted": true } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User or task not found");
    }
    res.status(200).send({ message: "Task soft deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create or update multiple subtasks for a task
exports.createOrUpdateSubtasks = async (req, res) => {
  try {
    const { username, taskId, subtasks } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    subtasks.forEach((subtask) => {
      if (subtask._id) {
        // Update existing subtask
        const existingSubtask = task.subtasks.id(subtask._id);
        if (existingSubtask) {
          existingSubtask.title = subtask.title;
          existingSubtask.description = subtask.description;
          existingSubtask.completed = subtask.completed;
        }
      } else {
        // Add new subtask
        task.subtasks.push(subtask);
      }
    });

    await user.save();
    res.status(201).send(task.subtasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all subtasks for a specific task
exports.getSubtasks = async (req, res) => {
  try {
    const { username, taskId } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    const subtasks = task.subtasks.filter((subtask) => !subtask.deleted);
    res.status(200).send(subtasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update multiple subtasks for a task
exports.updateSubtasks = async (req, res) => {
  try {
    const { username, taskId } = req.params;
    const { subtasks } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    subtasks.forEach((updatedSubtask) => {
      const subtask = task.subtasks.id(updatedSubtask._id);
      if (subtask) {
        subtask.title = updatedSubtask.title;
        subtask.description = updatedSubtask.description;
        subtask.completed = updatedSubtask.completed;
      }
    });

    await user.save();
    res.status(200).send(task.subtasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Soft delete multiple subtasks for a task
exports.deleteSubtasks = async (req, res) => {
  try {
    const { username, taskId } = req.params;
    const { subtaskIds } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    subtaskIds.forEach((subtaskId) => {
      const subtask = task.subtasks.id(subtaskId);
      if (subtask) {
        subtask.deleted = true;
      }
    });

    await user.save();
    res.status(200).send({ message: "Subtasks soft deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
