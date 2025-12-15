import express from "express";
import Setting from "../models/Settings.js";

const router = express.Router();

/* Save viewer settings */
router.post("/", async (req, res) => {
  const setting = await Setting.create(req.body);
  res.json(setting);
});

/* Get settings */
router.get("/", async (req, res) => {
  const settings = await Setting.find().sort({ createdAt: -1 });
  res.json(settings);
});

export default router;
