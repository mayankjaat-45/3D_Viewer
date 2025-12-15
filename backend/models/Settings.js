import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    backgroundColor: String,
    wireframe: Boolean,
    modelUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingsSchema);
