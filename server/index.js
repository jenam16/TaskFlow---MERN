// ─────────────────────────────────────────────
//  TaskFlow — server/index.js
// ─────────────────────────────────────────────
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// ── Middleware ────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tasks-flow2.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ── Routes ────────────────────────────────────
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ── Health Check ──────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API is running 🚀" });
});

// ── Global Error Handler ──────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});