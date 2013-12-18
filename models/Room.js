"use strict";

var db = require("../lib/db");
var Q = require("Q");
var assert = require("assert");
var RoomUser = require("./RoomUser");

function findUser(badge, location) {
	var deferred = Q.defer();
	//console.log("finding badge: ", badge);
	db.users.findOne({badge: badge}, function(error, doc) {
		//console.log("found badge: ", doc);
		if (error) {
			deferred.reject(new Error(error));
		} else {

			if(doc === null) {
				doc = new RoomUser({badge: badge, location: location});
			}
			deferred.resolve(doc);
		}
	});
	return deferred.promise;
}

function Room(args) {
	assert.ok(args.location, "Need location.");

	this.name = args.name || "";
	this.createdAt = args.createdAt || new Date();
	this.updatedAt = new Date();

	this.findUser = findUser;
}

module.exports = Room;
