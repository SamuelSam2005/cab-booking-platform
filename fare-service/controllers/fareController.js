const estimateFare = async (req, res) => {
  try {
    const { startingLocation, endingLocation } = req.body;

    if (!startingLocation || !endingLocation) {
      return res.status(400).json({
        message: "Starting location and ending location are required",
      });
    }

    // Simulated external fare estimation.
    // This represents real-time fare retrieval and can be replaced with RapidAPI later.
    const baseFare = 10;
    const randomDistanceKm = Math.floor(Math.random() * 15) + 5;
    const pricePerKm = 2;

    const estimatedFare = baseFare + randomDistanceKm * pricePerKm;

    res.status(200).json({
      message: "Fare estimated successfully",
      trip: {
        startingLocation,
        endingLocation,
        estimatedDistanceKm: randomDistanceKm,
      },
      fare: {
        baseFare,
        pricePerKm,
        estimatedFare,
        currency: "EUR",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error estimating fare",
      error: error.message,
    });
  }
};

module.exports = {
  estimateFare,
};