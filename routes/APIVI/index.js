const express = require('express');

const router = express.Router();


const auth = require('./auth');
const courses = require('./courses');

router.use('/auth', auth);
router.use('/courses', courses);

module.exports = router;