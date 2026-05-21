const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Customer Microservice is running",
  });
});

app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5001;

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Customer Service connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Customer Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });