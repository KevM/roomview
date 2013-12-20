'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'home' };

        res.render('index', model);

    });

};
