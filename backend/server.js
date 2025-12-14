import express from "express";
import cors from "cors";
import path from "path";

const app = express();

// ✅ CORS (allow frontend)
app.use(
  cors({
    origin: "*", // OR your vercel domain
    methods: ["GET", "POST"],
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ Static uploads with CORS headers
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);

// routes
app.use("/api/upload", uploadRoutes);
app.use("/api/settings", settingsRoutes);
