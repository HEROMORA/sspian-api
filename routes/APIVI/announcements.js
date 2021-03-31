const express = require('express');

const router = express.Router();

const {
  createAnnouncement,
  getEnrolledAnnouncements,
  updateAnnouncementById,
  getAnnouncementById,
} = require('../../controllers/announcementController');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const validBody = require('../../middleware/validBody');

router
  .route('/')
  .get(auth, getEnrolledAnnouncements)
  .post(
    [
      auth,
      role(['repre', 'teacher', 'admin']),
      validBody('createAnnouncement'),
    ],
    createAnnouncement
  );

router
  .route('/:id')
  .get(auth, getAnnouncementById)
  .put(
    [
      auth,
      role(['repre', 'teacher', 'admin']),
      validBody('updateAnnouncement'),
    ],
    updateAnnouncementById
  );

module.exports = router;
