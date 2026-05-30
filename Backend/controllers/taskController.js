const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching tasks",
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, stage } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      stage,
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating task",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, stage } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (stage !== undefined) task.stage = stage;

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating task",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting task",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
