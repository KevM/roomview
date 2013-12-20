"use strict";

var Rooms = require("../models/Rooms.js");
var Room = require("../models/Room.js");

module.exports = function (server) {

    server.get("/rooms", function (req, res) {
        Rooms.getAll().done(function(rooms) {
            res.render("rooms", { rooms : rooms });
        });
    });

    server.get("/room/new", function (req, res) {
        res.render("room-new", {});
    });

    server.post("/room/new", function (req, res) {
        //create a room with req.body
        var room = new Room({location: req.body.location, name: req.body.name });
        Rooms.saveRoom(room).done(function(result) {
            res.redirect("/room/" + room.location);
        });
    });

    server.get("/room/:location", function (req, res) {
        var location = req.params["location"];

        Rooms.findRoom(location).done(function(room) {

            if (!room) {
                res.send(404, 'That room does not exist.');
            }

            res.render("room", { room : room });
        });
    });
};
