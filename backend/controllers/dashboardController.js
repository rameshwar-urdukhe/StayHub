const User = require("../models/User");
const Property = require("../models/Property");
const Booking = require("../models/Booking");
const Review = require("../models/Review");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProperties = await Property.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const totalReviews = await Review.countDocuments();

    res.json({
      totalUsers,
      totalProperties,
      totalBookings,
      totalReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
