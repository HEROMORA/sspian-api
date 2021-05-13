const express = require('express');

const router = express.Router();

const {
  createDeadline,
  getEnrolledDeadlines,
  updateDeadlineById,
  getDeadlineById,
  getUpcommingDeadlines,
} = require('../../controllers/deadlineController');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const validBody = require('../../middleware/validBody');

router
  .route('/')
  .get(auth, getEnrolledDeadlines)
  .post(
    [auth, role(['repre', 'teacher', 'admin']), validBody('createDeadline')],
    createDeadline
  );

router.get('/upcomming', auth, getUpcommingDeadlines);

router
  .route('/:id')
  .get(auth, getDeadlineById)
  .put(
    [auth, role(['repre', 'teacher', 'admin']), validBody('updateDeadline')],
    updateDeadlineById
  );

module.exports = router;
