const Course = require('../models/course');
const Post = require('../models/post');
const AdvancedQuery = require('../utils/AdvancedQuery');
const AppError = require('../utils/AppError');

// Middleware function to check if the courseId corresponds to a real course
module.exports.checkCourseExists = async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError(`No course with the id ${courseId} exists`, 404));
  }

  next();
};

//  @desc   Creates a post for a specific course
//  @route  POST /api/v1/courses/:courseId/posts
//  @access Private
module.exports.createPost = async (req, res, next) => {
  const post = await Post.create({
    ...req.body,
    _profileId: req.user._profileId,
    _courseId: req.params.courseId,
  });

  res.status(201).json({
    sucess: true,
    data: { post },
  });
};

//  @desc   Gets posts for a specific course
//  @route  GET /api/v1/courses/:courseId/posts
//  @access Private
module.exports.getPosts = async (req, res, next) => {
  const advancedQuery = new AdvancedQuery(
    Post,
    Post.find({ _courseId: req.params.courseId }),
    req.query
  );

  const results = await (
    await advancedQuery.filter().select().sort().paginate(true)
  ).getResults();

  res.status(200).json({
    success: true,
    ...results,
  });
};

//  @desc   Gets posts for a specific course
//  @route  GET /api/v1/courses/:courseId/posts/:postId
//  @access Private
module.exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError(`No Post with the is of ${postId}`, 404));
  }

  res.status(200).json({
    sucess: true,
    data: { post },
  });
};

//  @desc   Deletes posts for a specific course
//  @route  DELETE /api/v1/courses/:courseId/posts/:postId
//  @access Private
module.exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findByIdAndDelete(postId);

  if (post._profileId !== req.user._profileId && req.user.role !== 'admin') {
    return next('You must be the auhtor of the comment to delete it', 403);
  }


  if (!post) {
    return next(new AppError(`No Post with the is of ${postId}`, 404));
  }

  res.status(204).json({
    sucess: true,
  });
};
