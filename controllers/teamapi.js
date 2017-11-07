'use strict';


var mongoose = require('mongoose');
var Team = mongoose.model('Team');

exports.list_all_team = function (req, res) {
    Team.find({}, function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
};




exports.create_a_team = function (req, res) {
    var new_team = new Team(req.body);
    new_team.save(function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
};


exports.get_a_team = function (req, res) {
    console.log(req.params.teamId);
    Team.findOne({ teamId: req.params.teamId }, function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
};


exports.update_a_team = function (req, res) {
    Team.findOneAndUpdate({ teamId: req.params.teamId }, req.body, { new: true }, function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
};


exports.delete_a_team = function (req, res) {
    Team.remove({
        teamId: req.params.teamId
    }, function (err, team) {
        if (err)
            res.send(err);
        res.json({ message: 'Team successfully deleted' });
    });
};
