import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("DB Connection Failed", err);
    process.exit(1);
  }
};

export default connectDb;
