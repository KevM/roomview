"use strict";

var Datastore = require("nedb");
var path = require("path");
var fs = require("fs");

var Db = function(){


    //TODO ensure that room.location is unique

    var databases = ["users", "rooms", "students"];

    this.getDbFileName = function(dbPath, name) {
        dbPath = dbPath || ".";
        return path.join(dbPath, (name + ".db"));
    };

	this.init = function(dbPath) {
        var self = this;
        databases.forEach(function(d) {
            var dbFilePath = self.getDbFileName(dbPath, d);
            self[d] = new Datastore({filename: dbFilePath, autoload: true });
        });

	};

    this._erase = function(dbPath) {
        var self = this;
        databases.forEach(function(d) {
            var dbFilePath = self.getDbFileName(dbPath, d);
            fs.unlink(dbFilePath);
        });
    };
};

module.exports = new Db();
