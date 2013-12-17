"use strict";

var Datastore = require("nedb");
var path = require("path");
var uuid = require("node-uuid");

var Db = function(){
	//little check to make sure we don't make multiple dbs - still learning how require works.
	console.log("starting db " + uuid.v1());

	this.init = function(dbPath) {
		this.dbPath = dbPath || ".";
		this.users = new Datastore({filename: path.join(this.dbPath, "users.db"), autoload: true});
		this.roomStatus = new Datastore({filename: path.join(this.dbPath,"roomStatus.db"), autoload: true});
	};
};

module.exports = new Db();