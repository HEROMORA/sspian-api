const Deadline = require('../models/deadline');
const Profile = require('../models/profile');
const AdvancedQuery = require('../utils/AdvancedQuery');
const AppError = require('../utils/AppError');

//  @desc   creates a deadline in the system
//  @route  POST /api/v1/deadlines/
//  @access private admin repre teacher admin
//  @body   title body _courseId type dueDate
module.exports.createDeadline = async (req, res, next) => {
  req.body._profileId = req.user._profileId;
  const deadline = new Deadline(req.body);

  await deadline.save();

  res.status(201).json({
    success: true,
    data: {
      deadline,
    },
  });
};

//  @desc   gets all deadlines in which user in enrolled in
//  @route  GET /api/v1/deadlines/
//  @access private
module.exports.getEnrolledDeadlines = async (req, res, next) => {
  const profile = await Profile.findById(req.user._profileId);

  const advancedResults = new AdvancedQuery(
    Deadline,
    Deadline.find({ _courseId: { $in: profile.enrollments } }),
    req.query
  );

  const results = await (
    await advancedResults.filter().select().sort().paginate(true)
  ).getResults();

  res.status(200).json({
    success: true,
    ...results,
  });
};

//  @desc   updates an deadline
//  @route  PUT /api/v1/deadlines/:id
//  @access private repre teacher admin (author of deadline)
//  @body   title body dueDate type
module.exports.updateDeadlineById = async (req, res, next) => {
  const deadlineId = req.params.id;

  let deadline = await Deadline.findById(deadlineId);

  if (
    deadline._profileId !== req.user._profileId &&
    req.user.role !== 'admin'
  ) {
    return next(
      new AppError(
        403,
        'You must be the author of the deadline to update it'
      )
    );
  }

  deadline = await Deadline.findByIdAndUpdate(deadlineId, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: {
      deadline,
    },
  });
};

//  @desc   gets an deadline by id
//  @route  GET /api/v1/deadlines/:id
//  @access private
module.exports.getDeadlineById = async (req, res, next) => {
  const deadlineId = req.params.id;

  const deadline = await Deadline.findById(deadlineId);

  res.status(200).json({
    success: true,
    data: {
      deadline,
    },
  });
};
