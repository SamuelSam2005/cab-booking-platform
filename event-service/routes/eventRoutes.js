const express = require("express");
const router = express.Router();

const {
  checkDiscountEligibility,
} = require("../controllers/eventController");

router.post("/discount/check", checkDiscountEligibility);

module.exports = router;