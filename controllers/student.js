"use strict";

var students = require("../models/students");
var Student = require("../models/student");

module.exports = function (server) {

    server.get("/student/:badge", function (req, res) {
        var badge = req.params.badge;
        students.findStudent(badge).done(function(student) {
            if(!student) {
                res.send(404, "That user does not exist.");
            }
            res.render("student", student);
        });
    });

    server.get("/student/:badge/edit", function (req, res) {
        var badge = req.params.badge;
        students.findStudent(badge).done(function(student) {
            res.render("student-edit", student);
        });
    });

    server.post("/student/:badge/edit'", function (req, res) {
        var badge = req.params.badge;
        var student = new Student({badge : badge, name: req.body.name});
        students.saveStudent(student).done(function(student) {
            res.redirect("/student/" + badge);
        });
    });

};
