const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const locationRoutes = require("./routes/locationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Location Microservice is running",
  });
});

app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 5004;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Location Service connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Location Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });