const {isValidObjectId} = require('mongoose');
const AppError = require('../utils/AppError');

module.exports = (req, res, next, id) => {
    if (!isValidObjectId(id)) {
        return next(new AppError('Invalid Object ID Parameter', 400));
    }

    next();
}