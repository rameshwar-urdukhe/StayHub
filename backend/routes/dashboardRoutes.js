const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/adminMiddleware");

const { getDashboardStats } = require("../controllers/dashboardController");

router.get("/stats", protect, isAdmin, getDashboardStats);

module.exports = router;
