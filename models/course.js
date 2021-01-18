const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: [true, 'Course code must be unique'],
    },
    creditHours: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 4,
    },
    type: {
        type: String,
        required: true,
        enum: ['core', 'elective', 'humanity']
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;