const express = require("express");
const router = express.Router();

const {
  checkDiscountEligibility,
  scheduleCabReadyNotification,
} = require("../controllers/eventController");

router.post("/discount/check", checkDiscountEligibility);
router.post("/cab-ready/schedule", scheduleCabReadyNotification);

module.exports = router;