"use strict";

var db = require("./db");
var Q = require("Q");

function findUser(badge) {
	var deferred = Q.defer();
	
	db.users.findOne({badge: badge}, function(error, doc) {
	    if (error) {
	        deferred.reject(new Error(error));
	    } else {
	        deferred.resolve(doc);
	    }
	});
	return deferred.promise;
}

function BadgeScanner(args) {
	
	this.location = args.location || "default";
	this.lookup = findUser;
}

module.exports = BadgeScanner;