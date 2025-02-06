const {
  is_Prime,
  is_Armstrong,
  is_Perfect,
  Digitsum,
  getFunFact,
} = require("../utils/number");

const getNumberDetails = async (req, res) => {
  const num = req.validNumber;

  // Perform calculations
  const is_prime = num > 1 ? is_Prime(num) : false;
  const is_perfect = is_Perfect(num);
  const is_armstrong = is_Armstrong(Math.abs(num));
  const digit_sum = Digitsum(Math.abs(num));

  // Determine properties
  let properties = [];
  if (is_armstrong) properties.push("armstrong");
  if (num % 2 !== 0) properties.push("odd");
  else properties.push("even");

  // Fetch fun fact from Numbers API
  let fun_fact = "No fun fact available";
  try {
    fun_fact = await getFunFact(num);
  } catch (error) {
    console.error("Error fetching fun fact:", error);
  }

  // Send response with all required fields
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
