const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv')
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
require('express-async-errors');


module.exports = function(app) {
    dotenv.config({ path: './config/config.env' });

    let staticPath = path.join(__dirname, '../public'); //It goes three one folder back from given __dirname.

    // Set static folder
    app.use(express.static(staticPath));

    // Allow App to parse JSON
    app.use(express.json());

    // Allow application to upload files
    app.use(fileUpload());

    // Middleware library used for logging the requests
    app.use(morgan('dev'));

}