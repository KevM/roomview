"use strict";

var assert = require("assert");

function RoomUser(args) {
	assert.ok(args.badge, "Need badge number.");

	this.badge = args.badge;
    this.location = args.location || "default";
	this.name = args.name || "";

	this.createdAt = args.createdAt || new Date();
	this.updatedAt = new Date();
    this.status = args.status || "checking in";

    this.checkIn = function(status){
        this.status = status || "in";
        this.isPresent = true;
        this.inAt = new Date();
        this.updatedAt = new Date();
    };

    this.checkOut = function(status){
        this.status = status || "out";
        this.isPresent = false;
        this.outAt = new Date();
        this.updatedAt = new Date();
    };
}

module.exports = RoomUser;
