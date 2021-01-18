const { body } = require('express-validator');

// Validates the body of request of creating a course
module.exports = () => {
  return [
    body('name').exists(),
    body('code').exists(),
    body('creditHours').exists().isLength({ min: 1, max: 4 }),
    body('type').exists(),
  ];
};
