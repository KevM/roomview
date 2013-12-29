"use strict";

var Rooms = require("../models/rooms.js");
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
        var location = req.params.location;

        Rooms.findRoom(location).done(function(room) {

            if (!room) {
                res.send(404, "That room does not exist.");
            }

            room.users().done(function(users) {
                res.render("room", { room : room, users : users });
            });
        });
    });

    server.get("/room/:location/scan", function (req, res) {
        var location = req.params.location;

        Rooms.findRoom(location).done(function(room) {

            if (!room) {
                res.send(404, "That room does not exist.");
            }

            res.render("room-scan", { room : room });
        });
    });


    server.post("/room/:location/scan", function (req, res) {
        var location = req.params.location;

        var badge = req.body.badge;

        if(!badge) {
            res.redirect("/room/" + location + "/scan");
            return;
        }

        Rooms.findRoom(location).then(function(room) {

            if (!room) {
                res.send(404, "That room does not exist.");
            }

            room.scanBadge(req.body.badge).done(function(user) {
                console.log("scanned badge for room ",location, " user ", user);
                res.render("room-scan", { room : room, user : user });
            });
        });
    });
};
