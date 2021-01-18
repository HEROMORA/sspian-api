const AppError = require("../utils/AppError");

module.exports = (roles) => (req, res, next) => {
    for(let i = 0; i < roles.length; i++) {
        if (roles[i] === req.user.role) {
            return next();
        }
    }

    next(new AppError('Unauthorized access', 403));
};