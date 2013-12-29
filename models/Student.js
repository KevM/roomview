"use strict";

var assert = require("assert");

function Student(args) {
	assert.ok(args.badge, "Need badge number.");

	this.badge = args.badge;
	this.name = args.name || "";
	this.createdAt = args.createdAt || new Date();
	this.updatedAt = new Date();
}

module.exports = Student;
