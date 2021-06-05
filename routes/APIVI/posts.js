const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  createPost,
  checkCourseExists,
  getPosts,
  getPost,
} = require('../../controllers/postController');

const auth = require('../../middleware/auth');
const validBody = require('../../middleware/validBody');

router.use(auth);
router.use(checkCourseExists);

router.route('/').get(getPosts).post(validBody('createPost'), createPost);

router.route('/:postId').get(getPost);

module.exports = router;
