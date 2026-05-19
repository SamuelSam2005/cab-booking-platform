const express = require("express");
const cors = require("cors");
require("dotenv").config();

const gatewayRoutes = require("./routes/gatewayRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Gateway is running",
  });
});

app.use("/api", gatewayRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});