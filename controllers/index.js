const asyncErrorWrapper = require("express-async-handler");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const resize = asyncErrorWrapper(async (req, res) => {
  const width = parseInt(req.body.width);
  const height = parseInt(req.body.height);

  if (!req.file) {
    return res.status(400).json({ error: "Image not uploaded" });
  }

  if (!width || !height) {
    return res.status(400).json({ error: "Valid dimensions must be entered" });
  }

  const originalFilePath = path.join("uploads", req.file.filename);
  const resizedImageName = `resized-${req.file.filename}`;
  const resizedImagePath = path.join("uploads", resizedImageName);

  try {
    await sharp(originalFilePath)
      .resize({
        width: width,
        height: height,
        fit: "inside",
      })
      .toFile(resizedImagePath);

    return res.download(resizedImagePath, resizedImageName, async (err) => {
      if (err) {
        console.error("Error during download:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error sending image" });
      }

      setTimeout(() => {
        fs.unlink(originalFilePath, (err) => {
          if (err) {
            console.error("Error deleting original image:", err);
          } else {
            console.log("Original image deleted:", originalFilePath);
          }
        });

        fs.unlink(resizedImagePath, (err) => {
          if (err) {
            console.error("Error deleting resized image:", err);
          } else {
            console.log("Resized image deleted:", resizedImagePath);
          }
        });
      }, 60000);
    });
  } catch (error) {
    console.error("Error processing the image:", error);
    return res.status(500).json({
      success: false,
      error: "Error resizing image",
    });
  }
});

module.exports = resize;
