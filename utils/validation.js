const validateNumber = (req, res, next) => {
  const number = req.params.number || req.query.number;

  // Check if number is provided
  if (!number) {
    return res.status(400).json({
      number: "",
      error: true,
    });
  }

  // Validate if the number contains only digits (with optional negative sign)
  if (!/^-?\d+$/.test(number)) {
    return res.status(400).json({
      number: number.toString(),
      error: true,
    });
  }

  const num = parseInt(number, 10);
  if (isNaN(num)) {
    return res.status(400).json({
      number: number.toString(),
      error: true,
    });
  }

  req.validNumber = num;
  next();
};

module.exports = validateNumber;
