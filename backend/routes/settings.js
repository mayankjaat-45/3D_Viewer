import express from "express";
import Setting from "../models/Setting.js";

const router = express.Router();

// Save settings
router.post("/", async (req, res) => {
  const { backgroundColor, wireframe, modelUrl } = req.body;
  try {
    const setting = new Setting({ backgroundColor, wireframe, modelUrl });
    await setting.save();
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get latest settings
router.get("/", async (req, res) => {
  try {
    const setting = await Setting.findOne().sort({ createdAt: -1 });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
