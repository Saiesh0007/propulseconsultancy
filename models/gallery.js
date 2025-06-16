const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
