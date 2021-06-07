const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  createPost,
  checkCourseExists,
  getPosts,
  getPost,
  deletePost,
} = require('../../controllers/postController');

const validBody = require('../../middleware/validBody');
const commentsRouter = require('./comments');

router.use(checkCourseExists);

// Corrseponds to routes /API/V1/Courses/:id/posts/:postId/comments
router.use('/:postId/comments', commentsRouter);

router.route('/').get(getPosts).post(validBody('createPost'), createPost);

router.route('/:postId').get(getPost).delete(deletePost);

module.exports = router;
