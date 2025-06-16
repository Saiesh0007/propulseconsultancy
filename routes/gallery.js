const express = require("express");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/gallery");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// POST: Upload Image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Gallery({
      title: req.body.title,
      url: `/uploads/${req.file.filename}`,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// GET: All Images
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

module.exports = router;
