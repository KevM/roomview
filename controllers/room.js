'use strict';

var Rooms = require("../models/Rooms.js");

module.exports = function (server) {

    server.get('/rooms', function (req, res) {
        Rooms.getAll().done(function(rooms) {
            res.render('rooms', { rooms : rooms });
        });
    });

    server.get('/room/new', function (req, res) {
        res.render('room-new');
    });
};
