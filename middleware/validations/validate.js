const createUser = require('./createUser');
const loginUser = require('./loginUser');

const createCourse = require('./createCourse');
const updateCourse = require('./updateCourse');

const createAnnouncement = require('./createAnnouncement');
const updateAnnouncement = require('./updateAnnouncement');

const createDeadline = require('./createDeadline');
const updateDeadline = require('./updateDeadline');

const createPost = require('./createPost');

// Validation based on parameter
module.exports = (field) => {
  switch (field) {
    // User Validations
    case 'createUser':
      return createUser();
    case 'loginUser':
      return loginUser();

    // Course Validations
    case 'createCourse':
      return createCourse();
    case 'updateCourse':
      return updateCourse();

    // Announcment Validations
    case 'createAnnouncement':
      return createAnnouncement();
    case 'updateAnnouncement':
      return updateAnnouncement();

    // Deadline Validations
    case 'createDeadline':
      return createDeadline();
    case 'updateDeadline':
      return updateDeadline();

    // Post Validations
    case 'createPost':
      return createPost();

  }

  next();
};
