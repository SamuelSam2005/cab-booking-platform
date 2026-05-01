const express = require("express");
const router = express.Router();

const {
  createBooking,
  getCurrentBookings,
  getPastBookings,
  completeBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/current/:userId", getCurrentBookings);
router.get("/past/:userId", getPastBookings);

// Useful for testing past bookings
router.patch("/:bookingId/complete", completeBooking);

module.exports = router;