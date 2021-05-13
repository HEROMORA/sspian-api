const mongoose = require('mongoose');

const BaseUpdate = require('./update');

const Announcement = BaseUpdate.discriminator('Announcement', mongoose.Schema({}));

module.exports = Announcement;