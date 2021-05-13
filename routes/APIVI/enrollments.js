const express = require('express');

const router = express.Router();

const {
  getEnrollments,
  enrollInCourse,
  unenrollInCourse,
} = require('../../controllers/enrollmentController');

router.route('/').get(getEnrollments);

router.post('/enroll/:courseId', enrollInCourse);
router.post('/unenroll/:courseId', unenrollInCourse);

module.exports = router;
