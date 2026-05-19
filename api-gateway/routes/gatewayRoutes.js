const express = require("express");
const axios = require("axios");
const router = express.Router();

const forwardRequest = async (req, res, serviceUrl, path) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${path}`,
      data: req.body,
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Gateway request failed",
      error: error.response?.data || error.message,
    });
  }
};

// Customer routes
router.use("/customers", async (req, res) => {
  await forwardRequest(
    req,
    res,
    process.env.CUSTOMER_SERVICE_URL,
    `/api/customers${req.url}`
  );
});

// Booking routes
router.use("/bookings", async (req, res) => {
  await forwardRequest(
    req,
    res,
    process.env.BOOKING_SERVICE_URL,
    `/api/bookings${req.url}`
  );
});

// Payment routes
router.use("/payments", async (req, res) => {
  await forwardRequest(
    req,
    res,
    process.env.PAYMENT_SERVICE_URL,
    `/api/payments${req.url}`
  );
});

// Location routes
router.use("/locations", async (req, res) => {
  await forwardRequest(
    req,
    res,
    process.env.LOCATION_SERVICE_URL,
    `/api/locations${req.url}`
  );
});

// Event routes
router.use("/events", async (req, res) => {
  await forwardRequest(
    req,
    res,
    process.env.EVENT_SERVICE_URL,
    `/api/events${req.url}`
  );
});

// Fare routes
router.use("/fares", async (req, res) => {
  await forwardRequest(
    req,
    res,
    process.env.FARE_SERVICE_URL,
    `/api/fares${req.url}`
  );
});

module.exports = router;