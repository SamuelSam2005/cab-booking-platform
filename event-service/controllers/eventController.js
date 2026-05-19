const Notification = require("../models/Notification");

// TASK 5 — Discount notification after 3 completed bookings
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

// TASK 6 — Cab ready notification after 3 minutes
const scheduleCabReadyNotification = async (req, res) => {
  try {
    const {
      userId,
      bookingId,
      startingLocation,
      endingLocation,
      cabType,
    } = req.body;

    if (
      !userId ||
      !bookingId ||
      !startingLocation ||
      !endingLocation ||
      !cabType
    ) {
      return res.status(400).json({
        message: "All cab ready event fields are required",
      });
    }

    // Simulate driver search process
    setTimeout(async () => {
      try {
        await Notification.create({
          userId,
          type: "CAB_READY",
          message: `Your ${cabType} cab for booking ${bookingId} is ready for pickup from ${startingLocation} to ${endingLocation}.`,
        });

        console.log(
          `Cab ready notification created for booking ${bookingId}`
        );
      } catch (error) {
        console.error("Error creating cab ready notification:", error.message);
      }
    }, 180000); // 3 minutes = 180000 ms

    res.status(200).json({
      message:
        "Cab ready notification scheduled successfully (3 minute delay)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error scheduling cab ready notification",
      error: error.message,
    });
  }
};

module.exports = {
  checkDiscountEligibility,
  scheduleCabReadyNotification,
};