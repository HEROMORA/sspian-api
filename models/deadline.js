const mongoose = require('mongoose');

const BaseUpdate = require('../models/update');

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


const Deadline = BaseUpdate.discriminator('Deadline', deadlineSchema);

module.exports = Deadline;