
const Course = require("../models/course");
const Profile = require("../models/profile");
const AppError = require("../utils/AppError");

//  @desc   enrolls a student into a course
//  @route  POST /api/v1/profiles/enrollments/enroll/:courseId
//  @access Private
module.exports.enrollInCourse = async (req, res, next) => {
  const courseId = req.params.courseId;

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError('No course with this id is found'));
  }

  let profile = await Profile.findById(req.user._profileId);

  const csId = profile.enrollments.find((c) => c._id.toString() === courseId);

  if (csId) {
    return next(new AppError('User is already enrolled in this course', 400));
  }

  profile = await Profile.findOneAndUpdate(
    { _id: profile._id },
    { $push: { enrollments: course._id.toString() } },
    { new: true }
  ).populate('enrollments');

  res.status(200).json({
    success: true,
    data: {
      message: 'User enrolled in course successfully',
      profile,
      course,
    },
  });
};

//  @desc   enrolls a student into a course
//  @route  POST /api/v1/profiles/enrollments/uneroll/:courseId
//  @access Private
module.exports.unenrollInCourse = async (req, res, next) => {
  const courseId = req.params.courseId;

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError('No course with this id is found'));
  }

  let profile = await Profile.findById(req.user._profileId);

  const csId = profile.enrollments.find((c) => c.toString() === courseId);

  if (!csId) {
    return next(new AppError('User is not enrolled in this course', 400));
  }

  profile = await Profile.findOneAndUpdate(
    { _id: profile._id },
    { $pullAll: { enrollments: [csId] } },
    { new: true }
  ).populate('enrollments');

  res.status(200).json({
    success: true,
    data: {
      message: 'User unenrolled from course successfully',
      profile,
      course,
    },
  });
};

//  @desc   Gets the current enrollments
//  @route  GET /api/v1/profiles/enrollments
//  @access Private
module.exports.getEnrollments = async (req, res, next) => {
  const populate = req.query.populate;

  let profile = Profile.findById(req.user._profileId);

  if (populate === 'true') {
    profile = profile.populate('enrollments');
  }

  profile = await profile;

  res.status(200).json({
    success: true,
    data: {
      enrollments: profile.enrollments,
    },
  });
};
