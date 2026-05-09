const Payment = require("../models/Payment");

const getCabMultiplier = (cabType) => {
  if (cabType === "Economic") return 1;
  if (cabType === "Premium") return 1.2;
  if (cabType === "Executive") return 1.4;
  return null;
};

const getDaytimeMultiplier = (bookingDateTime) => {
  const hour = new Date(bookingDateTime).getHours();

  if (hour >= 0 && hour < 8) {
    return 1.2;
  }

  return 1;
};

const getPassengersMultiplier = (passengers) => {
  if (passengers >= 1 && passengers <= 4) return 1;
  if (passengers >= 5 && passengers <= 8) return 2;
  return null;
};

const createPayment = async (req, res) => {
  try {
    const {
      userId,
      bookingId,
      cabFare,
      cabType,
      bookingDateTime,
      passengers,
      discount,
    } = req.body;

    if (
      !userId ||
      !bookingId ||
      !cabFare ||
      !cabType ||
      !bookingDateTime ||
      !passengers
    ) {
      return res.status(400).json({
        message: "All payment fields are required",
      });
    }

    const cabMultiplier = getCabMultiplier(cabType);
    const daytimeMultiplier = getDaytimeMultiplier(bookingDateTime);
    const passengersMultiplier = getPassengersMultiplier(passengers);

    if (!cabMultiplier) {
      return res.status(400).json({
        message: "Invalid cab type. Use Economic, Premium, or Executive",
      });
    }

    if (!passengersMultiplier) {
      return res.status(400).json({
        message: "More than 8 passengers are not allowed",
      });
    }

    const discountMultiplier = discount || 1;

    const totalPrice =
      cabFare *
      cabMultiplier *
      daytimeMultiplier *
      passengersMultiplier *
      discountMultiplier;

    const payment = await Payment.create({
      userId,
      bookingId,
      cabFare,
      cabType,
      cabMultiplier,
      daytimeMultiplier,
      passengers,
      passengersMultiplier,
      discount: discountMultiplier,
      totalPrice: Number(totalPrice.toFixed(2)),
    });

    res.status(201).json({
      message: "Payment completed successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating payment",
      error: error.message,
    });
  }
};

const getPaymentByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const payment = await Payment.findOne({ bookingId });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found for this booking",
      });
    }

    res.status(200).json({
      message: "Payment details retrieved",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving payment",
      error: error.message,
    });
  }
};

const getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "User payments retrieved",
      payments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving payments",
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPaymentByBooking,
  getUserPayments,
};