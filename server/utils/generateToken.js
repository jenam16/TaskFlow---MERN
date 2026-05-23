// server/utils/generateToken.js
// Helper to generate JWT tokens

const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },           // Payload: store user ID
    process.env.JWT_SECRET,   // Secret key from .env
    { expiresIn: "7d" }       // Token expires in 7 days
  );
};

module.exports = generateToken;
