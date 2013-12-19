'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'home' };

        res.render('index', model);

    });

    server.get('/rooms', function (req, res) {
        var model = { name: 'rooms' };

        res.render('rooms', model);

    });

};
