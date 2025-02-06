const axios = require("axios");
const NodeCache = require("node-cache");
const mathCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Optimized prime check with cache
const is_Prime = (num) => {
  const cacheKey = `prime_${num}`;
  const cached = mathCache.get(cacheKey);
  if (cached !== undefined) return cached;

  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  const sqrt = Math.sqrt(num);
  while (i <= sqrt) {
    if (num % i === 0 || num % (i + 2) === 0) {
      mathCache.set(cacheKey, false);
      return false;
    }
    i += 6;
  }
  mathCache.set(cacheKey, true);
  return true;
};

// Optimized perfect number check with cache
const is_Perfect = (num) => {
  const cacheKey = `perfect_${num}`;
  const cached = mathCache.get(cacheKey);
  if (cached !== undefined) return cached;

  if (num <= 1) return false;
  let sum = 1;
  const sqrt = Math.sqrt(num);

  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      sum += i;
      const complement = num / i;
      if (complement !== i) sum += complement;
    }
  }
  const result = sum === num && num !== 1;
  mathCache.set(cacheKey, result);
  return result;
};

const is_Armstrong = (num) => {
  let sum = 0;
  let temp = Math.abs(num); // Work with absolute value
  const power = Math.floor(Math.log10(Math.abs(num))) + 1;

  while (temp > 0) {
    const rem = temp % 10;
    sum += Math.pow(rem, power);
    temp = Math.floor(temp / 10);
  }

  return sum === Math.abs(num);
};

const Digitsum = (num) => {
  let sum = 0;
  num = Math.abs(num); // Use absolute value

  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }

  return sum;
};

const getFunFact = async (num) => {
  try {
    const response = await axios.get(`http://numbersapi.com/${num}?json`);
    return response.data.text;
  } catch (error) {
    console.error("Error fetching fun fact:", error);
    return "No fun fact available";
  }
};

module.exports = { is_Prime, is_Perfect, is_Armstrong, Digitsum, getFunFact };
