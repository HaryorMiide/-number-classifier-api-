require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getNumberDetails } = require("./Controller/functions");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Register the API route
app.get("/api/classify-number", getNumberDetails);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
