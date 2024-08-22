const multer = require("multer");
const fs = require("fs/promises");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

async function ensureUploadsDirectory() {
  try {
    await fs.mkdir("uploads", { recursive: true });
  } catch (err) {
    console.error("Error creating uploads directory:", err);
  }
}

ensureUploadsDirectory();

module.exports = upload;
