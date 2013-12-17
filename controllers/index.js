'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'roomview' };
        
        res.render('index', model);
        
    });

};
