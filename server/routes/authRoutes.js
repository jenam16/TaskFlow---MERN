// server/routes/authRoutes.js
// Auth-related API endpoints

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);  // Public route
router.post("/login", loginUser);        // Public route
router.get("/me", protect, getMe);       // Protected route (requires token)

module.exports = router;
