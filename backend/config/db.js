import mongoose from "mongoose";

const connectDb = async () => {
  if (!process.env.MONGO_URL) {
    console.log("⚠️ MongoDB skipped (MONGO_URL not set)");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error.message);
  }
};

export default connectDb;
