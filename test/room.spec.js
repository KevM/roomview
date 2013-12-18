"use strict";

var RoomUser = require("../models/RoomUser"),
Room = require("../models/Room"),
expect = require("chai").expect;

describe('room', function() {

    describe('findUser', function () {

        var room = null;
        var db = null;
        var expectedUser = {badge : "known user", name: "Fred Garvins"};

        before(function (done) {
            room = new Room({location : "location"});

            db = require("../lib/db")
            db.init();
            db.users.insert(expectedUser, function(err, docs) { done(); });
        });

        after(function (done) {
            db.users.remove(expectedUser, function(err, docs) { done(); });
        });

        it("should return new entry for unknown user", function (done) {
            room.findUser("unknown").then(function(user) {
                expect(user.badge).to.equal("unknown");
                done();
            });
        });

        it("should return known user", function (done) {
            room.findUser("known user").then(function(user) {
                expect(user.name).to.equal("Fred Garvins");
                done();
            });
        });

    });

});