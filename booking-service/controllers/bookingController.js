const Booking = require("../models/Booking");

// Create new booking
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      startingLocation,
      endingLocation,
      bookingDateTime,
      passengers,
      cabType,
    } = req.body;

    if (
      !userId ||
      !startingLocation ||
      !endingLocation ||
      !bookingDateTime ||
      !passengers ||
      !cabType
    ) {
      return res.status(400).json({
        message: "All booking fields are required",
      });
    }

    const booking = await Booking.create({
      userId,
      startingLocation,
      endingLocation,
      bookingDateTime,
      passengers,
      cabType,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// Get current bookings
const getCurrentBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({
      userId,
      status: "current",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Current bookings retrieved",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving current bookings",
      error: error.message,
    });
  }
};

// Get past bookings
const getPastBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({
      userId,
      status: "completed",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Past bookings retrieved",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving past bookings",
      error: error.message,
    });
  }
};

// Mark booking as completed (for testing)
const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "completed" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking marked as completed",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getCurrentBookings,
  getPastBookings,
  completeBooking,
};