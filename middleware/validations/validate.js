const createUser = require('./createUser');
const loginUser = require('./loginUser');

const createCourse = require('./createCourse');
const updateCourse = require('./updateCourse');


// Validation based on parameter
module.exports = (field) => {
    switch (field) {
        // User Validations
        case 'createUser': return createUser();
        case 'loginUser': return loginUser();

        // Course Validations
        case 'createCourse': return createCourse();
        case 'updateCourse': return updateCourse();
    }

    next();
}