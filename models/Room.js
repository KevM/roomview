"use strict";

var db = require("../lib/db");
var Q = require("Q");
var assert = require("assert");
var RoomUser = require("./RoomUser");
var students = require("./students");

function findUser(badge, location) {
	var deferred = Q.defer();
	db.users.findOne({badge: badge, location: location}, function(error, doc) {
		if (error) {
			deferred.reject(new Error(error));
		} else {

            //TODO maybe we should return null here and let other concerns handle setting up a default
			if(doc === null) {
				doc = new RoomUser({badge: badge, location: location, isPresent: true});
			}
            var user = new RoomUser(doc);
			deferred.resolve(user);
		}
	});
	return deferred.promise;
}

function locationUsers(location) {
    var deferred = Q.defer();
    db.users.find({location: location, isPresent: true}, function(error, docs) {
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
	this.updatedAt = args.updatedAt || new Date();
    var self = this;

	this.findUser = function(badge) {
        return findUser(badge, self.location);
    };
    this.users = function() {
        return locationUsers(self.location);
    };
    this.saveUser = function(user) {
        user.location = self.location;

        return students.findStudent(user.badge)
            .then(function(student) {
                if(student !== null) {
                    user.name = student.name;
                }
                return saveUser(user);
            });
    };

    this.scanBadge = function(badge) {

        //TODO maybe add some logic that checks if the user
        //  is checked into another location and checks them out from their first.

        return self.findUser(badge)
            .then(function(user) {

                if (user.status === "in") {
                    user.checkOut();
                }
                else {
                    user.checkIn();
                }

                return self.saveUser(user);
            });
    };
}

module.exports = Room;
