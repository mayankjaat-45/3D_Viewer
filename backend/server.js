import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDb from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ES Modules fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ ALLOWED ORIGINS (ARRAY — VERY IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean); // removes undefined safely

// ✅ CORS CONFIG
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman, server requests

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve GLB files WITH proper CORS
app.use(
  "/uploads",
  (req, res, next) => {
    const origin = req.headers.origin;

    if (
      origin === "http://localhost:5173" ||
      origin === process.env.FRONTEND_URL
    ) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/settings", settingsRoutes);

// Error handler
app.use(errorHandler);

// DB + Server
connectDb();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
