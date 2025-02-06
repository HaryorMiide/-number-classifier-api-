require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const { getNumberDetails } = require("./Controller/functions");
const validateNumber = require("./utils/validation");

const app = express();
const port = process.env.PORT || 3000;

// Add middleware
app.use(compression({
  level: 6, // Balanced compression
  threshold: 0 // Compress all responses
}));

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET",
  })
);

// Add cache headers middleware
app.use((req, res, next) => {
  // Cache successful responses for 1 hour
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Main endpoint

app.get(
  ["/api/classify-number", "/api/classify-number/:number"],
  validateNumber,
  getNumberDetails
);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    number: req.validNumber || null,
    error: true,
  });
});

app.listen(port, () => {
  console.log(Server running on port ${port});
});
