const mongoose = require('mongoose');

const Announcement = require('../models/announcement');

const deadlineSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'You must provide the type'],
        enum: ['project', 'quiz', 'assignment']
    },
    dueDate: {
        type: Date,
        required: [true, 'You must provide a deadline'],
    }
});


const DeadlineAnnouncement = Announcement.discriminator('DeadlineAnnouncement', deadlineSchema);

module.exports = DeadlineAnnouncement;