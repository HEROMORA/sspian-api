const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    body: {
        type: String,
        required: true,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;