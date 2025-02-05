import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  postTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["scheduled", "uploaded"],
    default: "scheduled",
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;