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
  const funFactCacheKey = `fun_${num}`;

  // Main response cache check
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  // Parallel execution of all calculations including fun fact
  const [calculations, funFact] = await Promise.all([
    // Group all synchronous calculations
    Promise.resolve({
      is_prime: num < 0 ? false : is_Prime(absNum),
      is_perfect: is_Perfect(absNum),
      is_armstrong: is_Armstrong(absNum),
      digit_sum: Digitsum(absNum),
    }),
    // Handle fun fact with separate caching
    (async () => {
      const cachedFact = funFactCache.get(funFactCacheKey);
      if (cachedFact) return cachedFact;

      try {
        const fact = await getFunFact(num);
        funFactCache.set(funFactCacheKey, fact);
        return fact;
      } catch (error) {
        const fallback = calculations.is_armstrong
          ? `${num} is an Armstrong number`
          : "Interesting number fact";
        funFactCache.set(funFactCacheKey, fallback);
        return fallback;
      }
    })()
  ]);

  const response = {
    number: num,
    is_prime: calculations.is_prime,
    is_perfect: calculations.is_perfect,
    properties: [
      ...(calculations.is_armstrong ? ["armstrong"] : []),
      num % 2 === 0 ? "even" : "odd",
    ],
    digit_sum: calculations.digit_sum,
    fun_fact: funFact
  };

  // Cache the complete response
  responseCache.set(cacheKey, response);

  res.json(response);
};

module.exports = { getNumberDetails };
