"use strict";

var db = require("../lib/db");
var Q = require("Q");
var assert = require("assert");
var RoomUser = require("./RoomUser");

function findUser(badge, location) {
	var deferred = Q.defer();
	db.users.findOne({badge: badge}, function(error, doc) {
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

function locationUsers(location) {
    var deferred = Q.defer();
    db.users.find({location: location}, function(error, docs) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}

function Room(args) {
	assert.ok(args.location, "Need location.");
    this.location = args.location;

	this.name = args.name || "";
	this.createdAt = args.createdAt || new Date();
	this.updatedAt = new Date();
    var self = this;
	this.findUser = function(badge) {
        return findUser(badge, self.location);
    };
    this.users = function() {
        return locationUsers(self.location);
    };
}

module.exports = Room;
