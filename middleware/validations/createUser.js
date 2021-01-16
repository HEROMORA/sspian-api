const { body } = require('express-validator');

// Validates the body of request of creating a user
module.exports = () => {
  return [
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 6 }),
    body('firstName').exists(),
    body('lastName').exists(),
    body('sspID').exists(),
    body('department').optional(),
  ];
};
