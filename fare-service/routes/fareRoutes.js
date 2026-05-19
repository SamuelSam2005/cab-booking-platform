const express = require("express");
const router = express.Router();

const { estimateFare } = require("../controllers/fareController");

router.post("/estimate", estimateFare);

module.exports = router;