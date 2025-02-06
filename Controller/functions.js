const {
  is_Prime,
  is_Armstrong,
  is_Perfect,
  Digitsum,
  getFunFact,
} = require("../utils/number");
const NodeCache = require("node-cache");
const responseCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

// Add at top
const CACHE_VERSION = 1;

const getNumberDetails = async (req, res) => {
  const num = req.validNumber;
  const absNum = Math.abs(num);
  const cacheKey = `${CACHE_VERSION}_${absNum}`;

  // Cache check
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return res.json({
      ...cached,
      number: num,
      properties: [
        ...cached.properties.filter((p) => p !== "even" && p !== "odd"),
        num % 2 === 0 ? "even" : "odd",
      ],
    });
  }

  // Parallel execution
  const [is_prime, is_perfect, is_armstrong, digit_sum] = await Promise.all([
    Promise.resolve(is_Prime(absNum)),
    Promise.resolve(is_Perfect(absNum)),
    Promise.resolve(is_Armstrong(absNum)),
    Promise.resolve(Digitsum(absNum)),
  ]);

  // Get fun fact with fallback
  let fun_fact;
  try {
    fun_fact = await getFunFact(num);
  } catch {
    fun_fact = is_armstrong
      ? `${num} is an Armstrong number`
      : "Interesting number fact";
  }

  // Build response
  const response = {
    number: num,
    is_prime,
    is_perfect,
    properties: [
      ...(is_armstrong ? ["armstrong"] : []),
      num % 2 === 0 ? "even" : "odd",
    ],
    digit_sum,
    fun_fact,
  };

  // Cache absolute value result
  responseCache.set(cacheKey, {
    ...response,
    number: absNum,
    properties: response.properties.filter((p) => p !== "even" && p !== "odd"),
  });

  res.json(response);
};

module.exports = { getNumberDetails };
