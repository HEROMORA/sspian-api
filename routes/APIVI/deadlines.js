const express = require('express');

const router = express.Router();

const {
  createDeadline,
  getEnrolledDeadlines,
  updateDeadlineById,
  getDeadlineById,
} = require('../../controllers/deadlineController');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const validBody = require('../../middleware/validBody');

router
  .route('/')
  .get(auth, getEnrolledDeadlines)
  .post(
    [
      auth,
      role(['repre', 'teacher', 'admin']),
      validBody('createDeadline'),
    ],
    createDeadline
  );

router
  .route('/:id')
  .get(auth, getDeadlineById)
  .put(
    [
      auth,
      role(['repre', 'teacher', 'admin']),
      validBody('updateDeadline'),
    ],
    updateDeadlineById
  );

module.exports = router;
