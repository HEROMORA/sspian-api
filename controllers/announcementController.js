const Announcement = require('../models/announcement');
const Profile = require('../models/profile');
const AdvancedQuery = require('../utils/AdvancedQuery');
const AppError = require('../utils/AppError');

//  @desc   creates a announcement in the system
//  @route  POST /api/v1/announcements/
//  @access private admin repre teacher admin
//  @body   title body _courseId
module.exports.createAnnouncement = async (req, res, next) => {
  req.body._profileId = req.user._profileId;
  const announcement = new Announcement(req.body);

  await announcement.save();

  res.status(201).json({
    success: true,
    data: {
      announcement,
    },
  });
};

//  @desc   gets all announcements in which user in enrolled in
//  @route  GET /api/v1/announcements/
//  @access private
module.exports.getEnrolledAnnouncements = async (req, res, next) => {
  const profile = await Profile.findById(req.user._profileId);

  const advancedResults = new AdvancedQuery(
    Announcement,
    Announcement.find({ _courseId: { $in: profile.enrollments } }),
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

//  @desc   updates an announcement
//  @route  PUT /api/v1/announcements/:id
//  @access private repre teacher admin (author of announcement)
//  @body   title body
module.exports.updateAnnouncementById = async (req, res, next) => {
  const announcmentId = req.params.id;

  let announcement = await Announcement.findById(announcmentId);

  if (
    announcement._profileId !== req.user._profileId &&
    req.user.role !== 'admin'
  ) {
    return next(
      new AppError(
        403,
        'You must be the author of the announcement to update it'
      )
    );
  }

  announcement = await Announcement.findByIdAndUpdate(announcmentId, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: {
      announcement,
    },
  });
};

//  @desc   gets an announcement by id
//  @route  GET /api/v1/announcements/:id
//  @access private
module.exports.getAnnouncementById = async (req, res, next) => {
  const announcmentId = req.params.id;

  const announcement = await Announcement.findById(announcmentId);

  res.status(200).json({
    success: true,
    data: {
      announcement,
    },
  });
};
