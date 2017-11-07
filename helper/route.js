'use strict';
module.exports = function (app, jwt) {
    var teamapi = require('../controllers/teamapi');
    var userapi = require('../controllers/userapi');
    var mongoose = require('mongoose');
    var User = mongoose.model('User');

    // Team Routes
    app.route('/api/team')
      .get(teamapi.list_all_team)
      .post(teamapi.create_a_team);


    app.route('/api/team/:teamId')
      .get(teamapi.get_a_team)
      .put(teamapi.update_a_team)
      .delete(teamapi.delete_a_team);

    //// User Routes
    app.route('/api/user')
      .get(userapi.list_all_user)
      .post(userapi.create_a_user);


    app.route('/api/user/:userId')
      .get(userapi.get_a_user)
      .put(userapi.update_a_user)
      .delete(userapi.delete_a_user);

    app.route('/authenticate')
        .post(function (req, res) {
            console.log(req.body.username);
            //find the user
            User.findOne({
                username: req.body.username
            }, function (err, user) {
                console.log(user);
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {

                    // check if password matches
                    if (user.password != req.body.password) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {

                        // if user is found and password is right
                        // create a token
                        console.log(app.get('superSecret'));
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                        });

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }

                }

            });
        });

};
