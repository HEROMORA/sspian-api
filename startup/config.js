const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv')
const express = require('express');
const morgan = require('morgan');
require('express-async-errors');

module.exports = function(app) {
    dotenv.config({ path: './config/config.env' });

    // Allow App to parse JSON
    app.use(express.json());

    // Middleware library used for logging the requests
    app.use(morgan('dev'));

}