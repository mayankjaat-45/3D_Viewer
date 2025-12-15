import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

/* Storage */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

/* File filter */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "model/gltf-binary" ||
    file.originalname.endsWith(".glb")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .glb files allowed"));
  }
};

const upload = multer({ storage, fileFilter });

/* Upload route */
router.post("/", upload.single("model"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.json({ url: fileUrl });
});

export default router;
