// server/models/Task.js
// Mongoose schema for Task documents

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "done"], // Only these 3 values allowed
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // Only these 3 values allowed
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
