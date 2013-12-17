"use strict";

var assert = require("assert");
var uuid = require("node-uuid");

var Status = function(args){

	assert.ok(args.person, "Need a person.");
	this.person = args.person;

	this.status = args.status || "checking in";
	this.location = args.location || "default";

	this.uuid = args.uuid || uuid.v1();
	this.updatedAt = new Date();

	this.checkIn = function(status){
		this.status = status || "in";
		this.present = true;
		this.inAt = new Date();
		this.updatedAt = new Date();
	};

	this.checkOut = function(status){
		this.status = status || "out";
		this.present = false;
		this.outAt = new Date();
		this.updatedAt = new Date();
	};

	return this;

};

module.exports = Status;