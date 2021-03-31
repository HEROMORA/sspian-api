const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Announcment must have a title'],
    },
    body: {
        type: String,
        required: [true, 'Announcment  must have a description'],
    },
    likes: {
        type: Number,
        default: 0,
    },
    _courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Announcement must have a course id'],
        ref: 'Course',
    },
    _profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Announcement must have a profile id'],
        ref: 'Profile',
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;