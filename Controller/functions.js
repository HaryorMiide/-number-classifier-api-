
const {
  is_prime, 
  is_Armstrong,
  is_perfect,
  Digitsum,
  getFunFact,
} = require("../utils/number");
const NodeCache = require("node-cache");
const responseCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const CACHE_VERSION = 1;

const getNumberDetails = async (req, res) => {
  const num = req.validNumber;
  const absNum = Math.abs(num);
  const cacheKey = `${CACHE_VERSION}_${absNum}`;

  if (responseCache.has(cacheKey)) {
    const cached = responseCache.get(cacheKey);
    return res.json({
      ...cached,
      number: num,
      properties: [
        ...cached.properties.filter((p) => p !== "even" && p !== "odd"),
        num % 2 === 0 ? "even" : "odd",
      ],
    });
  }

  // FIX 1: Corrected is_Prime function call
  const [is_prime, is_perfect, is_armstrong, digit_sum] = await Promise.all([
    Promise.resolve(num > 1 ? is_Prime(num) : false),
    Promise.resolve(is_Perfect(absNum)),
    Promise.resolve(is_Armstrong(absNum)),
    Promise.resolve(Digitsum(absNum)),
  ]);

  // FIX 2: Ensure fun_fact always has a value
  let fun_fact;
  try {
    fun_fact = await getFunFact(num);
  } catch (error) {
    fun_fact = is_armstrong 
      ? `${num} is an Armstrong number`
      : "Interesting number fact";
  }

  // Ensure fun_fact is never empty
  if (!fun_fact?.trim()) {
    fun_fact = "Interesting number fact unavailable";
  }

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

  responseCache.set(cacheKey, {
    ...response,
    number: absNum,
    properties: response.properties.filter((p) => p !== "even" && p !== "odd"),
  });

  res.json(response);
};

module.exports = { getNumberDetails };
