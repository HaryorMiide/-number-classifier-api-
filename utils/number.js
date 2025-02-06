const axios = require("axios");

const is_Prime = (num) => {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

const is_Perfect = (num) => {
  if (num <= 1) return false;

  let temp = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      temp += i;
      if (i !== num / i) {
        temp += num / i;
      }
    }
  }
  return temp === num;
};

const is_Armstrong = (num) => {
  let sum = 0;
  let temp = num;
  const power = Math.floor(Math.log10(num)) + 1;

  while (temp > 0) {
    const rem = temp % 10;
    sum += Math.pow(rem, power);
    temp = Math.floor(temp / 10);
  }

  return sum === num;
};

const Digitsum = (num) => {
  let sum = 0;
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
