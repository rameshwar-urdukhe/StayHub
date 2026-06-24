const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

router.post("/:propertyId", protect, addToWishlist);

router.get("/", protect, getWishlist);
router.delete("/:propertyId", protect, removeFromWishlist);

module.exports = router;
