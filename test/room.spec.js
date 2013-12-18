/*global describe:false, it:false, before:false, after:false*/
"use strict";

var Room = require("../models/Room"),
expect = require("chai").expect;

describe("room", function() {

    var db;

    before(function(done) {
        db = require("../lib/db");
        db.init();
        done();
    });

    describe("find location users", function() {

        var room1, room2, room3, users;

        before(function (done) {
            room1 = new Room({location : "room1"});
            room2 = new Room({location : "room2"});
            room3 = new Room({location : "empty room"});

            users = [
            { badge: "1", location : "room1", name : "Fred"},
            { badge: "2", location : "room1", name : "Biff"},
            { badge: "3", location : "room2", name : "Frank"}
            ];
            db.users.insert(users, function() { done(); });
        });

        after(function (done) {
            db.users.remove(users, function() { done(); });
        });

        it("should return room1 users", function (done) {
            room1.users().then(function(results) {
                expect(results.length).to.equal(2);
                expect(results[0].badge).to.equal("1");
                expect(results[1].badge).to.equal("2");
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
        var expectedUser = {badge : "known user", name: "Fred Garvins"};

        before(function (done) {
            room = new Room({location : "location"});
            db.users.insert(expectedUser, function() { done(); });
        });

        after(function (done) {
            db.users.remove(expectedUser, function() { done(); });
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
