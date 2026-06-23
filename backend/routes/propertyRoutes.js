const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require("../controllers/propertyController");

router.route("/").get(getProperties).post(protect, isAdmin, createProperty);

router.get("/my-properties", protect, isAdmin, getMyProperties);

router
  .route("/:id")
  .get(getProperty)
  .put(protect, isAdmin, updateProperty)
  .delete(protect, isAdmin, deleteProperty);

  

module.exports = router;
