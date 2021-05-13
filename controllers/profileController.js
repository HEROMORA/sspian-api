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

