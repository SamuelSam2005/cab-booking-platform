const Notification = require("../models/Notification");

const checkDiscountEligibility = async (req, res) => {
  try {
    const { userId, completedBookingsCount } = req.body;

    if (!userId || completedBookingsCount === undefined) {
      return res.status(400).json({
        message: "User ID and completed bookings count are required",
      });
    }

    if (completedBookingsCount < 3) {
      return res.status(200).json({
        message: "User is not eligible for discount yet",
        eligible: false,
      });
    }

    const existingDiscountNotification = await Notification.findOne({
      userId,
      type: "DISCOUNT",
    });

    if (existingDiscountNotification) {
      return res.status(200).json({
        message: "Discount notification already created for this user",
        eligible: true,
        alreadyNotified: true,
      });
    }

    const notification = await Notification.create({
      userId,
      type: "DISCOUNT",
      message:
        "Congratulations! You have completed three bookings and unlocked a discount for your next ride.",
    });

    res.status(201).json({
      message: "Discount notification created successfully",
      eligible: true,
      alreadyNotified: false,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error checking discount eligibility",
      error: error.message,
    });
  }
};

module.exports = {
  checkDiscountEligibility,
};