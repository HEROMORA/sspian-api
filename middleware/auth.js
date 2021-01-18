const jwt = require('jsonwebtoken');

const AppError = require("../utils/AppError")

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new AppError('Invalid Token', 401));
    }

}