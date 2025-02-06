const express = require("express");
const { getNumberDetails } = require("../Controller/functions");
const validateNumber = require("../utils/validation");

const router = express.Router();

// Define route for number details
router.get("/number-details", validateNumber, getNumberDetails);

module.exports = router;
