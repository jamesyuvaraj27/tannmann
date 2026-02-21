const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/users", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
  return res.status(400).json({ error: "All fields are required" });
}
    const result = await pool.query(
      "INSERT INTO users (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, email]
    );

    res.status(201).json({
      message: "User saved successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});