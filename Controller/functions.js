const {
  is_Prime,
  is_Armstrong,
  is_Perfect,
  Digitsum,
  getFunFact,
} = require("../utils/number");
const NodeCache = require("node-cache");
const responseCache = new NodeCache({ stdTTL: 3600 });

// Add at top
const CACHE_VERSION = 1;

const getNumberDetails = async (req, res) => {
  const num = req.validNumber;
  const absNum = Math.abs(num);
  const cacheKey = ${CACHE_VERSION}_${num};

  // Cache check
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  // Parallel execution with reduced Promise overhead
  const [is_prime, is_perfect, is_armstrong, digit_sum] = [
    num < 0 ? false : is_Prime(absNum),
    is_Perfect(absNum),
    is_Armstrong(absNum),
    Digitsum(absNum),
  ];

  // Skip fun fact for faster response
  const response = {
    number: num,
    is_prime,
    is_perfect,
    properties: [
      ...(is_armstrong ? ["armstrong"] : []),
      num % 2 === 0 ? "even" : "odd",
    ],
    digit_sum,
  };

  // Cache the complete response
  responseCache.set(cacheKey, response);

  res.json(response);
};

module.exports = { getNumberDetails };
