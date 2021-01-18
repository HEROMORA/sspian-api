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

router
  .route('/:id')
  .get(auth, getCourseById)
  .put([auth, role(['admin']), validBody('updateCourse')], updateCourseById)
  .delete([auth, role(['admin'])], deleteCourseById);

router
  .route('/')
  .get(auth, getCourses)
  .post([auth, role(['admin']), validBody('createCourse')], createCourse);

module.exports = router;
