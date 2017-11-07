'use strict';
// Include the cluster module
// var cluster = require('cluster');

// // Code to run if we're in the master process
// if (cluster.isMaster) {
    // console.log("Cluster Module Starts");
    // console.log('Master' + process.pid + ' is running');
    // // Count the machine's CPUs
    // var cpuCount = require('os').cpus().length;
    // console.log("CPU Length : " + cpuCount)
    // // Create a worker for each CPU
    // for (var i = 0; i < cpuCount; i += 1) {
        // cluster.fork();
    // }

    // // Code to run if we're in a worker process
// } else {
    var express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      mongoose = require('mongoose'),
      Team = require('./models/team'),
      User = require('./models/user'),
     jwt = require('jsonwebtoken'),
      bodyParser = require('body-parser');

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/contactsDB');
    app.set('superSecret', 'testapp');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    // apply the routes to our application with the prefix /api
    app.use('/api', function (req, res, next) {


        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });


    var routes = require('./helper/route');

    routes(app, jwt);




    app.listen(port);

    //console.log('Worker '+process.pid+' started');
    console.log('contactsDB list RESTful API server started on: ' + port);
//}
// Listen for dying workers
// cluster.on('exit', function (worker) {

    // // Replace the dead worker,
    // // we're not sentimental
    // console.log('Worker %d died :(', worker.id);
    // cluster.fork();

// });