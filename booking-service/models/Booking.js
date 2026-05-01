const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    startingLocation: {
      type: String,
      required: true,
    },
    endingLocation: {
      type: String,
      required: true,
    },
    bookingDateTime: {
      type: Date,
      required: true,
    },
    passengers: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    cabType: {
      type: String,
      required: true,
      enum: ["Economic", "Premium", "Executive"],
    },
    status: {
      type: String,
      enum: ["current", "completed", "cancelled"],
      default: "current",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);