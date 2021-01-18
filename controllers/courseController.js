const Course = require('../models/course');
const AdvancedQuery = require('../utils/AdvancedQuery');
const AppError = require('../utils/AppError');

//  @desc   creates a course in the system
//  @route  POST /api/v1/courses/
//  @access private admin
//  @body   name code creditHours type
module.exports.createCourse = async (req, res, next) => {
  const course = new Course(req.body);

  await course.save();

  res.status(200).json({
    success: true,
    data: {
      course,
    },
  });
};

//  @desc   gets all course in the system
//  @route  GET /api/v1/courses/
//  @access private
module.exports.getCourses = async (req, res, next) => {
  const advancedResults = new AdvancedQuery(Course, Course.find(), req.query);
  const results = await (
    await advancedResults.filter().select().paginate()
  ).getResults();

  res.status(200).json({
    success: true,
    ...results,
  });
};

//  @desc   gets a course from the system by id
//  @route  GET /api/v1/courses/:id
//  @access private
module.exports.getCourseById = async (req, res, next) => {
  const id = req.params.id;

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError('No course with this is is found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      course,
    },
  });
};

//  @desc   Updates a course in the system by id
//  @route  PUT /api/v1/courses/:id
//  @access private admin
//  @body   name code creditHours type
module.exports.updateCourseById = async (req, res, next) => {
  const id = req.params.id;

  const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

  if (!course) {
    return next(new AppError('No course with this is is found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      course,
    },
  });
};

//  @desc   deletes a course from the system by id
//  @route  DELETE /api/v1/courses/:id
//  @access private admin
module.exports.deleteCourseById = async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findByIdAndRemove(id);

  if (!course) {
    return next(new AppError('No course with this is is found', 404));
  }

  res.status(204).json({});
};
