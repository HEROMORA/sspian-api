const { body } = require('express-validator');

// Validates the body of request of updating a announcement
module.exports = () => {
  return [
    body('title').optional(),
    body('body').optional(),
  ];
};
