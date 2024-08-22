const express = require('express');
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.set("trust proxy", true);
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Image Resizer API");
});

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
