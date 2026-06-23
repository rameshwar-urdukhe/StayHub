const Property = require("../models/Property");

const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const { search, sort } = req.query;

    let query = {};
    let sortOption = {};

    // Search by title OR location
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Sort
    if (sort === "low") {
      sortOption.price = 1;
    }

    if (sort === "high") {
      sortOption.price = -1;
    }

    const properties = await Property.find(query).sort(sortOption);

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getProperty = async (req, res) => {
  try {
const property = await Property.findById(req.params.id)
  .populate("owner", "name email")
  .populate({
    path: "reviews",
    populate: {
      path: "user",
      select: "name",
    },
  });

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      property: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

        if (
          property.owner.toString() !== req.user.id &&
          req.user.role !== "admin"
        ) {
          return res.status(403).json({
            message: "Access denied",
          });
        }


    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
};
