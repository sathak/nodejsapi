
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create a schema
var userSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileOffice: { type: Number },
    mobilePersonal: { type: Number },
    notificationId: { type: Number },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    active: Boolean,
    location: String,
    emailOffice: String,
    emailPersonal: String,
    deviceType: String,
    country: String,
    picture: { data: Buffer, contentType: String },
    osType: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;