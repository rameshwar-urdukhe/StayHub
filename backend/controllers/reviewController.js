const Review = require("../models/Review");
const Property = require("../models/Property");


const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const review = await Review.create({
      rating,
      comment,
      user: req.user.id,
      property: req.params.propertyId,
    });

    property.reviews.push(review._id);

    await property.save();

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {createReview}