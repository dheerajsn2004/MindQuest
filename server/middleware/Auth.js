const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

    if (!token) {
      return res.status(401).json({ success: false, error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH MIDDLEWARE ERROR: ", error);
    return res.status(401).json({ success: false, error: "Invalid token." });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, error: "Access denied. Admin privileges required." });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};
