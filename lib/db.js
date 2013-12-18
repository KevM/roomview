"use strict";

var Datastore = require("nedb");
var path = require("path");

var Db = function(){
	//little check to make sure we don't make multiple dbs - still learning how require works.
	console.log("starting db " + require("node-uuid").v1());

	this.init = function(dbPath) {
		this.dbPath = dbPath || ".";
		var userDatabaseFilePath = path.join(this.dbPath, "users.db");

		this.users = new Datastore({filename: userDatabaseFilePath, autoload: true});
		// ensure badge is unique 
		this.users.ensureIndex({ fieldName: "badge", unique: true }, function (err) {
			if (!err) {
				return;
			}

			console.error("Oh no! Looks like there are multiple users with the same badge in the database. " + err.message);
			console.log(err);
		});
	};		
};

module.exports = new Db();