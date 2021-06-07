const express = require('express');

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require('../../controllers/courseController');

// Middlewares
const validBody = require('../../middleware/validBody');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const router = express.Router();

const postsRouter = require('./posts');

router.use(auth);

// Corrseponds to routes /API/V1/Courses/:id/posts
router.use('/:courseId/posts', postsRouter);

router
  .route('/:id')
  .get(getCourseById)
  .put([role(['admin']), validBody('updateCourse')], updateCourseById)
  .delete([role(['admin'])], deleteCourseById);

router
  .route('/')
  .get(getCourses)
  .post([role(['admin']), validBody('createCourse')], createCourse);

module.exports = router;
