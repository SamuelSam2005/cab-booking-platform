const axios = require("axios");
const Location = require("../models/Location");

// Add favourite pickup location
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

// Retrieve user favourite locations
const getUserLocations = async (req, res) => {
  try {
    const { userId } = req.params;

    const locations = await Location.find({ userId }).sort({
      createdAt: -1,
    });

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

// Update favourite location
const updateLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { label, address } = req.body;

    const location = await Location.findByIdAndUpdate(
      locationId,
      {
        label,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
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

// Delete favourite location
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

// Retrieve real weather forecast from external API
const getWeatherForLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location.address}`
    );

    const weatherData = response.data;

    res.status(200).json({
      message: "Weather forecast retrieved successfully",
      location: {
        label: location.label,
        address: location.address,
      },
      weather: {
        condition: weatherData.current.condition.text,
        temperatureCelsius: weatherData.current.temp_c,
        humidity: weatherData.current.humidity,
        windKph: weatherData.current.wind_kph,
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