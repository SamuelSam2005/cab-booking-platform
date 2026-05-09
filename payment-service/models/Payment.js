const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookingId: {
      type: String,
      required: true,
    },
    cabFare: {
      type: Number,
      required: true,
    },
    cabType: {
      type: String,
      required: true,
      enum: ["Economic", "Premium", "Executive"],
    },
    cabMultiplier: {
      type: Number,
      required: true,
    },
    daytimeMultiplier: {
      type: Number,
      required: true,
    },
    passengers: {
      type: Number,
      required: true,
    },
    passengersMultiplier: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "failed"],
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);