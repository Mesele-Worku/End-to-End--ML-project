const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://54.175.26.202:5000/predict",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get prediction" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Node.js server running on http://localhost:${PORT}`)
);
