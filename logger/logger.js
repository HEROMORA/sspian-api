const winston = require('winston');

// Custom logger to log exceptionss and unhandeled rejections
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: './logger/error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: './logger/combined.log' }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: './logger/exceptions.log' }),
        new winston.transports.Console({
            format: winston.format.json(),
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

module.exports = logger;