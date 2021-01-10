const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        maxlength: 20,
        required: [true, 'You must provide a firstname'],
        minlength: 1,
    },
    lastName: {
        type: String,
        maxlength: 20,
        required: [true, 'You must provide a lastname'],
        minlength: 1,
    },
    department: {
        type: String,
        required: [true, 'You must provide your department'],
        enum: ['CAE', 'CCE', 'GPE', 'EME']
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;