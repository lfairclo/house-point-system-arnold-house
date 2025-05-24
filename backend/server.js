const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (err) {
    return { encoded: "" };
  }
}

function writeData(newData) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
}

// GET current encoded string
app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});

// POST to update the encoded string
app.post("/update", (req, res) => {
  const { encoded } = req.body;
  if (typeof encoded !== "string") {
    return res.status(400).json({ error: "Invalid data format" });
  }

  writeData({ encoded });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
