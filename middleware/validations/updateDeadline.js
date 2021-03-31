const { body } = require('express-validator');

// Validates the body of request of updating a deadline
module.exports = () => {
  return [
    body('title').optional(),
    body('body').optional(),
    body('dueDate').optional(),
    body('type').optional(),
  ];
};
