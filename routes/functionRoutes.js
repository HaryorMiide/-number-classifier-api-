const express = require("express");
const { getNumberDetails } = require("../Controller/functions");

const router = express.Router();

// Define route for number details
router.get("/number-details", getNumberDetails);

module.exports = router;
