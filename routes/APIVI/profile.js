const express = require('express');

const router = express.Router();

const {getMyProfile, uploadProfilePicture, enrollInCourse, unenrollInCourse, getEnrollments} = require('../../controllers/profileController');
const auth = require('../../middleware/auth');

router.post('/me/photo',auth, uploadProfilePicture);

router.route('/me').get(auth, getMyProfile);

router.route('/me/enrollments').get(auth, getEnrollments);

router.post('/enroll/:courseId', auth, enrollInCourse);
router.post('/unenroll/:courseId', auth, unenrollInCourse);


module.exports = router;