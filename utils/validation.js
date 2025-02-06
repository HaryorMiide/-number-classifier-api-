const validateNumber = (req, res, next) => {
  const { number } = req.query;

  // Check if number is missing
  if (!number) {
    return res.status(400).json({
      error: true,
      number: "",
    });
  }

  // Convert to integer
  const num = parseInt(number);

  // Check if conversion was unsuccessful (NaN case)
  if (isNaN(num)) {
    return res.status(400).json({
      error: true,
      number: "",
    });
  }

  // Attach valid number to request object for later use
  req.validNumber = num;
  next();
};

module.exports = validateNumber;
