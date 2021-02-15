const express = require('express');

const router = express.Router();

const {getMyProfile, uploadProfilePicture, enrollInCourse, unenrollInCourse} = require('../../controllers/profileController');
const auth = require('../../middleware/auth');

router.post('/me/photo',auth, uploadProfilePicture);

router.route('/me').get(auth, getMyProfile);

router.post('/enroll/:courseId', auth, enrollInCourse);
router.post('/unenroll/:courseId', auth, unenrollInCourse);


module.exports = router;