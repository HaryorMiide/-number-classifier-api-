const {
  is_Prime,
  is_Armstrong,
  is_Perfect,
  Digitsum,
  getFunFact,
} = require("../utils/number");

const getNumberDetails = async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number);

  // Validate input
  if (isNaN(num)) {
    return res.status(400).json({ message: "Invalid number" });
  }
  if (num <= 0) {
    return res.status(400).json({ message: "Number must be greater than 0" });
  }

  // Perform calculations
  const is_prime = is_Prime(num);
  const is_perfect = is_Perfect(num);
  const is_armstrong = is_Armstrong(num);
  const digit_sum = Digitsum(num);

  // Determine properties
  let properties = [];
  if (is_armstrong) properties.push("armstrong");
  if (num % 2 !== 0) properties.push("odd");
  else properties.push("even");

  // Fetch fun fact from API
  let fun_fact = "No fun fact available";
  try {
    fun_fact = await getFunFact(num);
  } catch (error) {
    console.error("Error fetching fun fact:", error);
  }

  // Send the response
  res.json({
    number: num,
    is_prime,
    is_perfect,
    properties,
    digit_sum,
    fun_fact,
  });
};

module.exports = { getNumberDetails };
