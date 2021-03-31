const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course must have a name'],
    },
    code: {
        type: String,
        required: true,
        unique: [true, 'Course code must be unique'],
    },
    creditHours: {
        type: Number,
        required: [true, 'Course must have credit hours'],
        minLength: 1,
        maxLength: 4,
    },
    type: {
        type: String,
        required: [true, 'Course must have a type'],
        enum: ['core', 'elective', 'humanity']
    },
    term: { 
        type: String,
        enum: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    },
    department: {
        type: String,
        required: [true, 'You must provide course department'],
        enum: ['CAE', 'CCE', 'GPE', 'EME','BME', 'OCE', 'GP']
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;