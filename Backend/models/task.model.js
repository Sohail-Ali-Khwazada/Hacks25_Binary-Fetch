import mongoose from 'mongoose'
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  scheduleDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
