import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import uploadRoutes from "./routes/upload.js";
import settingsRoutes from "./routes/settings.js";
import path from "path";

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/upload", uploadRoutes);
app.use("/api/settings", settingsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
