const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createProperty, getProperties, getProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");

router.route("/")
.get(getProperties)
.post(protect, createProperty)
.post(protect, updateProperty)

router
  .route("/:id")
  .get(getProperty)
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

module.exports = router;
