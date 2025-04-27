const express = require("express");
const router = express.Router();

// Import your route handlers
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const appointmentRoutes = require("./appointment.route");
const reviewRoutes = require("./review.route");

// Mount the route handlers
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
