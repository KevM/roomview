"use strict";

var assert = require("assert");

var Person = function(args){

	assert.ok(args.badge, "Need badge number.");

	this.badge = args.badge;
	this.name = args.name || "";

	this.createdAt = args.createdAt || new Date();
	this.updatedAt = new Date();

	return this;
};

module.exports = Person;