'use strict';

var kraken = require('kraken-js'),
    app = {},
    db = require('./lib/db');

app.configure = function configure(nconf, next) {
    var dbPath = nconf.get('dbPath')
	db.init(dbPath);

	//throw "do not configure"

    // Fired when an app configures itself
    next(null);
};


app.requestStart = function requestStart(server) {
    // Fired at the beginning of an incoming request
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Fired before routing occurs
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Fired after routing occurs
};


kraken.create(app).listen(function (err) {
    if (err) {
        console.error(err);
    }
});

process.on('uncaughtException', function (err) {
  console.log('Oh SNAP! Caught exception: ' + err);
});
