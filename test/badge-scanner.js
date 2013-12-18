"use strict";

var BadgeScanner = require("../lib/BadgeScanner"),
    should = require("chai").should();

describe('scanner lookup', function () {

    var scanner = null;
    var db = null;
    var expectedUser = {badge : "known user", name: "Fred Garvins"};
    
    before(function (next) {
        scanner = new BadgeScanner("location");

        db = require("../lib/db")
        db.init();
        db.users.insert(expectedUser, function(err, docs) { next(); });
    });

    after(function (next) {
        db.users.remove(expectedUser, function(err, docs) { next(); });
    });

    it("should return null for unknown user", function () {
        scanner.lookup("unknown").then(function(user) {
            user.should.equal(null);
        });
    });

    it("should return known user", function () {

        scanner.lookup("known user").then(function(user) {
            user.name.should.equal("Fred Garvins");
        });
    });

});