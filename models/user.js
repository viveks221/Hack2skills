const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  subtasks: [subtaskSchema],
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  tasks: [taskSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
