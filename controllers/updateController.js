const Update = require('../models/update');
const Profile = require('../models/profile');
const AdvancedQuery = require('../utils/AdvancedQuery');

//  @desc   gets all updates in which user in enrolled in
//  @route  GET /api/v1/updates/
//  @access private
module.exports.getEnrolledUpdates = async (req, res, next) => {
  const profile = await Profile.findById(req.user._profileId);

  const advancedResults = new AdvancedQuery(
    Update,
    Update.find({ _courseId: { $in: profile.enrollments } }),
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
