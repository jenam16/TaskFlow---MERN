// server/routes/taskRoutes.js
// Task CRUD API endpoints — all protected by JWT auth

const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// All task routes require authentication
router.use(protect);

router.get("/", getTasks);           // GET  /api/tasks
router.post("/", createTask);        // POST /api/tasks
router.put("/:id", updateTask);      // PUT  /api/tasks/:id
router.delete("/:id", deleteTask);   // DELETE /api/tasks/:id

module.exports = router;
