const express = require('express');

const router = express.Router();

const {
  getMyProfile,
  uploadProfilePicture,
} = require('../../controllers/profileController');
const auth = require('../../middleware/auth');

const enrollmentsRouter = require('./enrollments');

router.use(auth);

// Migrate to other routes with these URLs
router.use('/enrollments', enrollmentsRouter);

router.post('/me/photo', uploadProfilePicture);

router.route('/me').get(getMyProfile);

module.exports = router;
