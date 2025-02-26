import Agenda from "agenda";
import Post from "./models/post.model.js";

// Connect to MongoDB
export const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: "agendaJobs" },
});

// Define the task function
agenda.define("Post", async (job) => {
  const { postId } = job.attrs.data;
  const post = await Post.findById(postId);

  if (!post) {
    console.log(`Post ${postId} not found!`);
    return;
  }
  console.log(`Executing task: ${post.caption}`);
  const isUpload = await uploadPostOnScheduledTime(post);

  // Optionally update the task status after execution
  if (isUpload) {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { status: "completed" },
      { new: true }
    );
    console.log("Updated Post in Agenda.js : ", updatedPost);
  }
});

// Function to start Agenda
export const startAgenda = async () => {
  await agenda.start();
  console.log("Agenda started!");

  // Fetch all tasks with future scheduled dates and schedule them
  // const tasks = await Task.find({ scheduleDate: { $gte: new Date() } });
  // tasks.forEach((task) => {
  //   agenda.schedule(task.scheduleDate, "execute task", { taskId: task._id });
  // });
};

// Your function to execute
async function uploadPostOnScheduledTime(post) {
  console.log(`🚀 Running function for task: ${post.caption}`);
  console.log(post);
  return true;
}
