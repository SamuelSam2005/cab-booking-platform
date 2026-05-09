const axios = require("axios");
const Location = require("../models/Location");

const addLocation = async (req, res) => {
  try {
    const { userId, label, address } = req.body;

    if (!userId || !label || !address) {
      return res.status(400).json({
        message: "User ID, label and address are required",
      });
    }

    const location = await Location.create({
      userId,
      label,
      address,
    });

    res.status(201).json({
      message: "Favourite pickup location added successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding location",
      error: error.message,
    });
  }
};

const getUserLocations = async (req, res) => {
  try {
    const { userId } = req.params;

    const locations = await Location.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Favourite pickup locations retrieved",
      locations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving locations",
      error: error.message,
    });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { label, address } = req.body;

    const location = await Location.findByIdAndUpdate(
      locationId,
      { label, address },
      { new: true, runValidators: true }
    );

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    res.status(200).json({
      message: "Favourite pickup location updated successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating location",
      error: error.message,
    });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    const location = await Location.findByIdAndDelete(locationId);

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    res.status(200).json({
      message: "Favourite pickup location removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting location",
      error: error.message,
    });
  }
};

const getWeatherForLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    // Temporary mock weather response.
    // Later we will replace this with a real external Weather API call.
    res.status(200).json({
      message: "Weather forecast retrieved successfully",
      location: {
        label: location.label,
        address: location.address,
      },
      weather: {
        source: "Mock weather data",
        condition: "Clear",
        temperatureCelsius: 22,
        note: "External Weather API will be connected after CRUD testing.",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving weather forecast",
      error: error.message,
    });
  }
};

module.exports = {
  addLocation,
  getUserLocations,
  updateLocation,
  deleteLocation,
  getWeatherForLocation,
};