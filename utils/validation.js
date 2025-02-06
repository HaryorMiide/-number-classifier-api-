const validateNumber = (req, res, next) => {
  const number = req.params.number || req.query.number;

  if (!number) {
    return res.status(400).json({
      number: "",
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
