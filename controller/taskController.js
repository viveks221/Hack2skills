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

// Get all tasks for a user
exports.getAllTasks = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const tasks = filterDeleted(user.tasks);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { username, subject, deadline, status, subtasks } = req.body;
    let user = await User.findOne({ email: username });
    if (!user) {
      user = new User({ email: username, name: "Default Name", tasks: [] });
    }
    const task = {
      subject,
      deadline,
      status,
      subtasks: subtasks || [],
      deleted: false,
    };
    user.tasks.push(task);
    await user.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { subject, deadline, status } = req.body;
    const user = await User.findOneAndUpdate(
      { "tasks._id": taskId },
      {
        $set: {
          "tasks.$.subject": subject,
          "tasks.$.deadline": deadline,
          "tasks.$.status": status,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User or task not found");
    }
    const task = user.tasks.id(taskId);
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Soft delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findOneAndUpdate(
      { "tasks._id": taskId },
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

// Get all subtasks for a task
exports.getSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findOne({ "tasks._id": taskId });
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
    const { taskId } = req.params;
    const { subtasks } = req.body;
    const user = await User.findOne({ "tasks._id": taskId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    subtasks.forEach((updatedSubtask) => {
      const subtask = task.subtasks.id(updatedSubtask._id);
      const result = [];
      if (subtask) {
        subtask.subject = updatedSubtask.subject;
        subtask.deadline = updatedSubtask.deadline;
        subtask.status = updatedSubtask.status;
        result.push(subtask);
      } else {
        task.subtasks.push(updatedSubtask);
        result.push(subtask);
      }
    });
    await user.save();
    res.status(200).send(task.result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
