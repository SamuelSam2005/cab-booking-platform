const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPaymentByBooking,
  getUserPayments,
} = require("../controllers/paymentController");

router.post("/", createPayment);
router.get("/booking/:bookingId", getPaymentByBooking);
router.get("/user/:userId", getUserPayments);

module.exports = router;