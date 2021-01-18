const mongoose = require('mongoose');

const User = require('../models/user');
const Profile = require('../models/profile');
const AppError = require('../utils/AppError');

//  @desc   logins a user into the system and return access token
//  @route  POST /api/v1/auth/login
//  @access public
//  @body   email   password
module.exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('Invalid Email Address', 400));
  }

  const isCorrectPassword = await user.comparePassword(req.body.password);

  if (!isCorrectPassword) {
    return next(new AppError('Invalid Password', 400));
  }

  const profile = await Profile.findOne({_userId: user._id});

  userAuthenticated(res, user, profile);
};

//  @desc   registers a new user into the system and return access token
//  @route  POST /api/v1/auth/register
//  @access public
//  @body   email password firstname lastname
module.exports.register = async (req, res, next) => {
  const { email, password, firstName, lastName, department, sspID } = req.body;

  const pr = await Profile.findOne({$or: [{email}, {sspID}]});

  if (pr) {
    const errorMessage = pr.sspID === sspID ? 'A User with the same SSP ID Already Exists' : 'A User with the same Email Already Exists';
    return next(new AppError(errorMessage, 400));
  }


  const session = await mongoose.startSession();
  session.startTransaction();

  const user = new User({ email, password });

  await user.save({ session });

  const profile = new Profile({
    _userId: user._id,
    firstName,
    lastName,
    department,
    sspID
  });

  await profile.save({ session });

  await session.commitTransaction();
  session.endSession();

  userAuthenticated(res, user, profile);
};

// Helper function to generate Authentication token and send profile data to user
const userAuthenticated = (res, user, profile) => {

  const payload = {_profileId: profile._id};

  const token = user.generateAuthToken(payload);

  res.status(200).json({
    success: true,
    data: {
      token,
      profile
    }
  })
} 
