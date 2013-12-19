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
                //todo do not set location of new user?
				doc = new RoomUser({badge: badge, location: location});
			}
            var user = new RoomUser(doc);
			deferred.resolve(user);
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

            var users = docs.map(function(d) { return new RoomUser(d); });
            deferred.resolve(users);
        }
    });
    return deferred.promise;
}

function saveUser(user) {
    var deferred = Q.defer();
    db.users.update({badge: user.badge}, user, {upsert: true}, function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            //console.log("User with badge", user.badge, upsert ? "inserted into collection" : "updated in the collection");
            deferred.resolve(user);
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

	this.findUser = function(badge) {
        return findUser(badge, this.location);
    };
    this.users = function() {
        return locationUsers(this.location);
    };
    this.saveUser = function(user) {
        user.location = this.location;
        return saveUser(user);
    };
}

module.exports = Room;
