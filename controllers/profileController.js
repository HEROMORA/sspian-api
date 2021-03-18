const path = require('path');
const Course = require('../models/course');

const Profile = require("../models/profile");
const AppError = require('../utils/AppError');


//  @desc   fetches the logged in user profile
//  @route  GET /api/v1/profiles/me
//  @access private
module.exports.getMyProfile = async (req, res, next) => {
    const profileId = req.user._profileId;

    const profile = await Profile.findById(profileId);

    res.status(200).json({
        success: true,
        data: { profile }
    });
}

//  @desc   Updates the Logged in user profile
//  @route  PUT /api/v1/profiles/me/photo
//  @access Private
module.exports.uploadProfilePicture = async (req, res, next) => {
    const profileId = req.user._profileId;

    if (!req.files) {
        return next(new AppError('Please upload an image file', 400));
    }

    const file = req.files.file;

    // if (!file.mimetype.startsWith('image')) {
    //     return next(new AppError(`Please upload a valid image`, 400));
    // }

    if (file.size > process.env.MAX_FILE_SIZE) {
        return next(
            new AppError(
                `Too large file, please upload a file with a max of 6MB`,
                400
            )
        );
    }

    file.name = `photo_${profileId}${path.parse(file.name).ext}`;
    file.mv(`${process.env.UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            return next(new AppError(err, 500));
        }

        await Profile.findByIdAndUpdate(profileId, { photo: file.name });

        res.status(200).json({
            success: true,
            data: {'file': file.name},
        });
    });
};

//  @desc   enrolls a student into a course
//  @route  POST /api/v1/profiles/enroll/:courseId
//  @access Private
module.exports.enrollInCourse = async (req, res, next) => {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
        return next(new AppError('No course with this id is found'));
    }

    let profile = await Profile.findById(req.user._profileId);

    const csId = profile.enrollments.find(c => c._id.toString() === courseId);

    if (csId) {
        return next(new AppError('User is already enrolled in this course', 400));
    }

    profile = await Profile.findOneAndUpdate({_id: profile._id}, { $push: {enrollments: course._id.toString() }}, {new: true}).populate('enrollments');

    res.status(200).json({
        success: true,
        data: {
            message: 'User enrolled in course successfully',
            profile,
            course
        }
    });
}

//  @desc   enrolls a student into a course
//  @route  POST /api/v1/profiles/uneroll/:courseId
//  @access Private
module.exports.unenrollInCourse = async (req, res, next) => {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
        return next(new AppError('No course with this id is found'));
    }

    let profile = await Profile.findById(req.user._profileId);

    const csId = profile.enrollments.find(c => c.toString() === courseId);

    if (!csId) {
        return next(new AppError('User is not enrolled in this course', 400));
    }

    profile = await Profile.findOneAndUpdate({_id: profile._id} ,{$pullAll: {enrollments: [csId]}}, {new: true}).populate('enrollments');

    res.status(200).json({
        success: true,
        data: {
            message: 'User unenrolled from course successfully',
            profile,
            course
        }
    });
}