const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getCommentsByPost,
  getComment,
  deleteComment,
  createComment,
  checkPostExists,
} = require('../../controllers/commentController');

const validBody = require('../../middleware/validBody');

router.use(checkPostExists);

router
  .route('/')
  .get(getCommentsByPost)
  .post(validBody('createComment'), createComment);

router.route('/:commentId').get(getComment).delete(deleteComment);

module.exports = router;
