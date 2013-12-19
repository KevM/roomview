/*global describe:false, it:false, before:false*/
"use strict";

var RoomUser = require("../models/RoomUser"),
expect = require("chai").expect;

describe("room user", function() {

    var user = null;

    before(function () {
        user = new RoomUser({badge: "badge#", location : "location"});
    });

    it("default status should be checking in", function () {
        expect(user.status).to.equal("checking in");
    });
 
    describe("check in", function () {

        before(function () {
            user.checkIn();
        });

        it("should set status to in", function () {
            expect(user.status).to.equal("in");
        });

        it("should set in timestamp", function () {
            expect(user.inAt).to.be.a("Date");
        });

        it("should be present", function () {
            expect(user.isPresent).to.equal(true);
        });
    });

    describe("check out", function () {

        before(function () {
            user.checkIn();
            user.checkOut();
        });

        it("should set status to out", function () {
            expect(user.status).to.equal("out");
        });

        it("should set out timestamp", function () {
            expect(user.inAt).to.be.a("Date");
        });

        it("should not be present", function () {
            expect(user.isPresent).to.equal(false);
        });
    });

});