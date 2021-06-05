const express = require('express');

const router = express.Router();


const auth = require('./auth');
const courses = require('./courses');
const profile = require('./profile');
const announcements = require('./announcements');
const deadlines = require('./deadlines');
const updates = require('./updates');
const posts = require('./posts');

router.use('/auth', auth);
router.use('/courses', courses);
router.use('/profiles', profile);
router.use('/announcements', announcements);
router.use('/deadlines', deadlines);
router.use('/updates', updates);
router.use('/posts', posts);

module.exports = router;