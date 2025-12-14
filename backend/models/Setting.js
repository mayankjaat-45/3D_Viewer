import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    backgroundColor: { type: String, default: "#0f172a" },
    wireframe: { type: Boolean, default: false },
    modelUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
