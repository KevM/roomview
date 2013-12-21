/*global describe:false, it:false, before:false, after:false*/
"use strict";

var Rooms = require("../models/Rooms"),
Room = require("../models/Room"),
expect = require("chai").expect;

describe("rooms", function() {

    var db, rooms;

    before(function(done) {
        db = require("../lib/db");
        db.init("./tmp");
        rooms = [
            { location: "lab1", name : "Fancy Lab"},
            { location: "lab2", name : "Crappy Lab"},
            { location: "lab3", name : "Snappy Lab"}
        ];
        db.rooms.insert(rooms, function(error, docs) {
            done();
        });
    });

    after(function(done) {
        db._erase("./tmp");
        done();
    });

    describe("getting all rooms", function() {

        it("should return all rooms", function (done) {
            Rooms.getAll().done(function(results) {
                expect(results.length).to.equal(3);
                done();
            });
        });

    });

    describe("saving a room", function() {

        it("should save a room that does not already exist", function (done) {

            var room = new Room({location: "Timbuk 3" });

            Rooms.saveRoom(room).done(function(result) {
                expect(result.location).to.equal(room.location);
                done();
            });
        });

        it("should save a room that already exists", function (done) {

            var room = rooms[0];

            Rooms.saveRoom(room).done(function(result) {
                expect(result.location).to.equal(room.location);
                expect(result.name).to.equal(room.name);
                done();
            });
        });

        it("should show up in room listings", function (done) {

            var room = new Room({location: "Toto's Asia"});

            Rooms.saveRoom(room).then(function(result) {
                return Rooms.getAll();
            }).done(function(roomListing) {

                var results = roomListing.filter(function(r) {
                    return r.location === room.location;
                });

                expect(results.length).to.equal(1);
                done();
            });
        });
    });

    describe("find room", function() {
        it("should return null when room does not exist", function(done) {
            Rooms.findRoom("does not exist").done(function(room) {
                expect(room).to.equal(null);
                done();
            });
        });
        it("should find an existing room", function(done) {
            var expectedRoom = rooms[0];
            Rooms.findRoom(expectedRoom.location).done(function(room) {
                //expect(room.name).to.equal(expectedRoom.name);
                done();
            });
        });
    });

});
