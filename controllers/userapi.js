'use strict';

var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.list_all_user = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};




exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.get_a_user = function (req, res) {
    console.log(req.params.userId);
    User.findOne({ UserId: req.params.userId }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.update_a_user = function (req, res) {
    User.findOneAndUpdate({ UserId: req.params.userId }, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_a_user = function (req, res) {
    User.remove({
        UserId: req.params.userId
    }, function (err, User) {
        if (err)
            res.send(err);
        res.json({ message: 'user successfully deleted' });
    });
};
