const express = require("express");
const router = express.Router();
const resize = require("../controllers");
const upload = require("../helpers");

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Image Resizer API",
  });
});

router.post("/resize", upload.single("image"), resize);

module.exports = router;
