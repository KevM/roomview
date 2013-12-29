"use strict";

var db = require("../lib/db");
var Q = require("Q");
var Student = require("./Student");

function findStudent(badge) {

    var deferred = Q.defer();
    db.students.findOne({badge: badge}, function(error, doc) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            if(doc !== null) {
                doc = new Student(doc);
            }
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}

function saveStudent(student) {

    var deferred = Q.defer();
    db.students.update({badge: student.badge}, student, {upsert: true}, function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(student);
        }
    });
    return deferred.promise;
}

module.exports = {
    findStudent : findStudent,
    saveStudent : saveStudent
};
