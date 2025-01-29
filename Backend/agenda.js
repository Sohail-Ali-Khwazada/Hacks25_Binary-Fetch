import Agenda from "agenda";
import mongoose from "mongoose";
import Task from "./models/task.model.js";

// Connect to MongoDB
export const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: "agendaJobs" },
});

// Define the task function
agenda.define("execute task", async (job) => {
  const { taskId } = job.attrs.data;
  const task = await Task.findById(taskId);

  if (!task) {
    console.log(`Task ${taskId} not found!`);
    return;
  }

  console.log(`Executing task: ${task.title}`);

  // Your function logic here
  console.log(`Running function for task: ${task.title}`);

  // Optionally update the task status after execution
  await Task.findByIdAndUpdate(taskId, { status: "completed" });
});

// Function to start Agenda
export const startAgenda = async () => {
  await agenda.start();
  console.log("Agenda started!");

  // Fetch all tasks with future scheduled dates and schedule them
  const tasks = await Task.find({ scheduleDate: { $gte: new Date() } });
  tasks.forEach((task) => {
    agenda.schedule(task.scheduleDate, "execute task", { taskId: task._id });
  });
};


// Your function to execute
function runYourFunction(task) {
  console.log(`🚀 Running function for task: ${task.title}`);
  // Your actual function logic goes here (e.g., sending email, notification, etc.)
}
