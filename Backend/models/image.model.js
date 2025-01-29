import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});

const ImageModel = mongoose.model("Image", ImageSchema);

export default ImageModel;