/*global describe:false, it:false, before:false, after:false*/
"use strict";

var Room = require("../models/Room"),
RoomUser = require("../models/RoomUser"),
expect = require("chai").expect;

describe("room", function() {

    var db;

    before(function(done) {
        db = require("../lib/db");
        db.init("./tmp");
        done();
    });

    after(function(done) {
        db._erase("./tmp");
        done();
    });

    describe("find present location users", function() {

        var room1, room2, room3, users;

        before(function (done) {
            room1 = new Room({location : "room1"});
            room2 = new Room({location : "room2"});
            room3 = new Room({location : "empty room"});

            users = [
                new RoomUser({ badge: "1", location : "room1", isPresent: true }),
                new RoomUser({ badge: "2", location : "room1", isPresent: false }),
                new RoomUser({ badge: "3", location : "room2", isPresent: true })
            ];
            db.users.insert(users, function() { done(); });
        });

        it("should return room1 users that are present", function (done) {
            room1.users().done(function(results) {
                expect(results.length).to.equal(1);
                expect(results[0].badge).to.equal("1");
                done();
            });
        });

        it("should return room2 users", function (done) {
            room2.users().then(function(results) {
                expect(results.length).to.equal(1);
                expect(results[0].badge).to.equal("3");
                done();
            });
        });

        it("should return no users for empty room", function (done) {
            room3.users().then(function(results) {
                expect(results.length).to.equal(0);
                done();
            });
        });
    });

    describe("findUser", function () {

        var room = null;
        var expectedUser = {badge : "known user", location: "location", name: "Fred Garvins", isPresent: true };

        before(function (done) {
            room = new Room({location : "location"});
            db.users.insert(expectedUser, function() { done(); });
        });

        it("should return new entry for unknown user", function (done) {
            room.findUser("unknown").then(function(user) {
                expect(user.badge).to.equal("unknown");
                expect(user.name).to.equal("");
                done();
            });
        });

        it("should return new entry for known user in another location", function (done) {
            room.findUser("known user at another location").then(function(user) {
                expect(user.badge).to.equal("known user at another location");
                done();
            });
        });

        it("should checkout user checked into another location");

        it("should return known user", function (done) {
            room.findUser("known user").done(function(user) {
                expect(user.name).to.equal("Fred Garvins");
                done();
            });
        });

    });

    describe("saveUser", function () {

        var room, user;

        before(function (done) {
            room = new Room({location : "saveRoom1"});
            user = new RoomUser({ badge: "saveUser", location : "saveRoom1", name : "Fred", isPresent: true });
            db.users.insert(user, function(err, newDoc) { done(); });
        });

        it("should save user who does not exist", function (done) {

            var user = new RoomUser({badge: "new saveUser", location: "saveRoom1", name: "First Last", isPresent: true });
            user.checkIn();

            room.saveUser(user)
                .then(function(result) {
                    return room.findUser(result.badge);
                })
                .done(function(result) {
                    expect(result.badge).to.equal(user.badge);
                    expect(result.name).to.equal(user.name);
                    expect(result.status).to.equal(user.status);

                    done();
                });
        });

        it("should save user who already exists", function (done) {
            room.findUser(user.badge)
                .then(function(result) {
                    result.checkOut();
                    return room.saveUser(result);
                })
                .done(function(result) {
                    expect(result.badge).to.equal(user.badge);
                    expect(result.name).to.equal(user.name);
                    expect(result.status).to.equal("out");

                    done();
                });
        });
    });

    describe("scanBadge", function() {
        var room;

        before(function () {
            room = new Room({location : "scanBadge room"});
        });

        it("should check in user not already present in the room", function(done) {
            room.scanBadge("not present")
                .done(function(user) {
                    expect(user.isPresent).to.equal(true);
                    expect(user.inAt).to.be.a("Date");
                    done();
                });
        });

        it("should check out user not already present in the room", function(done) {
            var user = new RoomUser({badge: "present", location: room.location});
            user.checkIn();

            room.saveUser(user)
                .then(function(result) {
                    return room.scanBadge(result.badge)
                })
                .done(function(result) {
                    expect(result.isPresent).to.equal(false);
                    expect(result.outAt).to.be.a("Date");
                    done();
                });
        });

    });
});
