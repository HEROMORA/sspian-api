const { body } = require('express-validator');

// Validates the body of request of creating a announcement
module.exports = () => {
  return [
    body('title').exists(),
    body('body').exists(),
    body('_courseId').exists().isMongoId(),
  ];
};
