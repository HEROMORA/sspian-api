const { body } = require('express-validator');

// Validates the body of request of creating a comment
module.exports = () => {
  return [
    body('body').exists(),
  ];
};
