const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile',
  },
  _courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
    max: 100,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
