const { body } = require('express-validator');

// Validates the body of request of creating a post
module.exports = () => {
  return [
    body('title').exists(),
    body('body').exists(),
  ];
};
