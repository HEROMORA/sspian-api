const apiv1 = require('../routes/APIVI/index');

module.exports = function(app) {

    // Handle routes to the first version of the API
    app.use('/api/v1', apiv1);
}