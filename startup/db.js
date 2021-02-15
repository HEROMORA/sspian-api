const mongoose = require('mongoose');

const logger = require('../logger/logger');

// Defining essential options for the database settings
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// Connecting to the database and logging occuring errors or successfuly connection
mongoose
  .connect(process.env.MONGO_URI, options)
  .then((conn) => {
    logger.info(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  })
  .catch((err) => {
    console.log(err);
    logger.error(`MongoDB failed to connect ${err}`.red);
  });
