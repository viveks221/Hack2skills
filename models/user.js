const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  subtasks: [subtaskSchema],
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tasks: [taskSchema],
});

module.exports = mongoose.model("User", userSchema);
