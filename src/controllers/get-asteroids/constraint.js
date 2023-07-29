module.exports = (req) => ({
  startDate: {
    value: req.query.startDate,
    optional: false,
    validator: {
      isValid: (value) => new Date(value).toISOString().substring(0, 10) === value,
    },
  },
  endDate: {
    value: req.query.endDate,
    optional: false,
    validator: {
      isValid: (value) => new Date(value).toISOString().substring(0, 10) === value,
    },
  },
});
