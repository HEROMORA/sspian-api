const { body } = require('express-validator');

// Validate the body of the request to login user
module.exports = () => {
  return [
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 6 }),
  ];
};
