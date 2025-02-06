const {
  is_Prime,
  is_Armstrong,
  is_Perfect,
  Digitsum,
  getFunFact,
} = require("../utils/number");
const NodeCache = require("node-cache");
const responseCache = new NodeCache({ stdTTL: 3600 });

// Add separate cache for fun facts with longer TTL
const funFactCache = new NodeCache({ stdTTL: 86400 }); // 24 hours for fun facts

// Add at top
const CACHE_VERSION = 1;

const getNumberDetails = async (req, res) => {
  const num = req.validNumber;
  const absNum = Math.abs(num);
  const cacheKey = `${CACHE_VERSION}_${num}`;

  // Cache check
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  // Parallel execution
  const [is_prime, is_perfect, is_armstrong, digit_sum] = await Promise.all([
    Promise.resolve(num < 0 ? false : is_Prime(absNum)),
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

  // Cache the response
  responseCache.set(cacheKey, response);

  res.json(response);
};

module.exports = { getNumberDetails };
