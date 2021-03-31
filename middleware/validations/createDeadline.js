const { body } = require('express-validator');

// Validates the body of request of creating a deadline
module.exports = () => {
  return [
    body('title').exists(),
    body('body').exists(),
    body('dueDate').exists(),
    body('type').exists().isIn(['quiz', 'project', 'assignment']),
    body('_courseId').exists().isMongoId(),
  ];
};
