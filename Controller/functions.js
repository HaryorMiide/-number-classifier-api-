const {
  is_Prime,
  is_Armstrong,
  is_Perfect,
  Digitsum,
  getFunFact,
} = require("../utils/number");
const NodeCache = require("node-cache");
const responseCache = new NodeCache({ stdTTL: 300 }); // 5-minute cache

const getNumberDetails = async (req, res) => {
  const num = req.validNumber;
  const cacheKey = `response_${num}`;

  // Check cache first
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  // Parallelize calculations
  const [is_prime, is_perfect, is_armstrong, digit_sum] = await Promise.all([
    Promise.resolve(is_Prime(num)),
    Promise.resolve(is_Perfect(num)),
    Promise.resolve(is_Armstrong(Math.abs(num))),
    Promise.resolve(Digitsum(Math.abs(num))),
  ]);

  // Get fun fact with timeout
  let fun_fact = "No fun fact available";
  try {
    fun_fact = await Promise.race([
      getFunFact(num),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Fun fact timeout")), 500)
      ),
    ]);
  } catch (error) {
    console.error("Fun fact error:", error.message);
  }

  // Build response
  const properties = [];
  if (is_armstrong) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  const response = {
    number: num,
    is_prime,
    is_perfect,
    properties,
    digit_sum,
    fun_fact,
  };

  // Cache the response
  responseCache.set(cacheKey, response);
  res.json(response);
};
