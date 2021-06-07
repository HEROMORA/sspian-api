const Post = require('../models/post');
const Course = require('../models/course');
const Comment = require('../models/comment');
const AppError = require('../utils/AppError');

// Middleware to check if post exists
module.exports.checkPostExists = async (req, res, next) => {
  const postId = req.params.postId;

  const post = Post.findById(postId);

  if (!post) {
    return next(new AppError(`No post with this ${postId} id is found`, 404));
  }

  next();
};

//  @desc   Creates a comment for a post
//  @route  POST /api/v1/courses/:courseId/posts/:postId/comments
//  @access private
module.exports.createComment = async (req, res, next) => {
  const comment = await Comment.create({
    ...req.body,
    _profileId: req.user._profileId,
  });

  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $push: { comments: comment._id.toString() },
    },
    { new: true }
  ).populate('comments');

  res.status(201).json({
    sucess: true,
    data: { comment, post },
  });
};

//  @desc   Creates a comment for a post
//  @route  GET /api/v1/courses/:courseId/posts/:postId/comments/:commentId
//  @access private
module.exports.getComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(`No comment with this id ${commentId} is found`);
  }

  res.status(201).json({
    sucess: true,
    data: { comment },
  });
};

//  @desc   Gets comments for a post
//  @route  GET /api/v1/courses/:courseId/posts/:postId/comments/
//  @access private
module.exports.getCommentsByPost = async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate('comments');
  const comments = post.comments;

  res.status(200).json({
    sucess: true,
    data: { comments },
  });
};

//  @desc   Deletes a comment for a post
//  @route  DELETE /api/v1/courses/:courseId/posts/:postId/comments/:commentId
//  @access private
module.exports.deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);

  if (comment._profileId !== req.user._profileId && req.user.role !== 'admin') {
    return next('You must be the auhtor of the comment to delete it', 403);
  }

  if (!comment) {
    return next(`No comment with this id ${commentId} is found`);
  }

  res.status(204).json({
    sucess: true,
    data: { comment },
  });
};
