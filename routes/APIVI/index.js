const express = require('express');

const router = express.Router();


const auth = require('./auth');
const courses = require('./courses');
const profile = require('./profile');

router.use('/auth', auth);
router.use('/courses', courses);
router.use('/profiles', profile);

module.exports = router;