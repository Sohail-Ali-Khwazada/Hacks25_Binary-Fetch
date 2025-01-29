import Task from "../models/task.model.js";
import { agenda } from "../agenda.js";  

export const addTask = async (req, res) => {
  const { title, scheduleDate } = req.body;

  // Convert the scheduleDate to a Date object (assumes it is in ISO string format)
  let taskDate = new Date(scheduleDate);

  // Subtract 5 hours and 30 minutes (for IST adjustment)
  taskDate.setHours(taskDate.getHours() - 5);
  taskDate.setMinutes(taskDate.getMinutes() - 30);

  // Create and save the task with the adjusted date
  const newTask = new Task({ title, scheduleDate: taskDate });
  await newTask.save();

  // Schedule the job with Agenda
  await agenda.schedule(taskDate, "execute task", { taskId: newTask._id });

  res.json({ message: "Task scheduled successfully!", task: newTask });
};
