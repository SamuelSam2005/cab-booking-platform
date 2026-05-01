const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Booking Microservice is running",
  });
});

app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5002;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Booking Service connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Booking Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });