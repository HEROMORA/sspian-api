const express = require('express');
const logger = require('./logger/logger');

const app = express();

require('./startup/config')(app);

const port = process.env.PORT || 5000;

require('./startup/db');
require('./startup/routes')(app);

const server = app.listen(port, () => {
    logger.info(`The app is running on port ${port}`.yellow);
});

module.exports = app;