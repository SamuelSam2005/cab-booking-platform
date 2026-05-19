const express = require("express");
const cors = require("cors");
require("dotenv").config();

const fareRoutes = require("./routes/fareRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Fare Estimation Microservice is running",
  });
});

app.use("/api/fares", fareRoutes);

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`Fare Service running on port ${PORT}`);
});