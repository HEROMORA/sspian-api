const { body } = require('express-validator');

module.exports = () => {
    return [
        body('name').optional(),
        body('code').optional(),
        body('creditHours').optional().isLength({ min: 1, max: 4 }),
        body('type').optional(),
    ]
};
