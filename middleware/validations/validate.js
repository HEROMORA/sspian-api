const createUser = require('./createUser');
const loginUser = require('./loginUser');


// Validation based on parameter
module.exports = (field) => {
    switch (field) {
        // User Validations
        case 'createUser': return createUser();
        case 'loginUser': return loginUser();
    }

    next();
}