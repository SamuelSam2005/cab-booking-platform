const express = require("express");
const router = express.Router();

const {
  addLocation,
  getUserLocations,
  updateLocation,
  deleteLocation,
  getWeatherForLocation,
} = require("../controllers/locationController");

router.post("/", addLocation);
router.get("/user/:userId", getUserLocations);
router.put("/:locationId", updateLocation);
router.delete("/:locationId", deleteLocation);
router.get("/:locationId/weather", getWeatherForLocation);

module.exports = router;