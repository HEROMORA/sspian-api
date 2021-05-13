const express = require('express');

const router = express.Router();

const {
  getEnrolledUpdates,
} = require('../../controllers/updateController');

const auth = require('../../middleware/auth');

router
  .route('/')
  .get(auth, getEnrolledUpdates);

module.exports = router;
