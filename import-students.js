var csv = require('csv');
var Student = require('./models/Student');
var students = require('./models/students');

var db = require('./lib/db');
db.init('./db');

csv()
.from.path(__dirname+'/students.csv', { delimiter: ',', escape: '"' })
.to.array(function(data, count){
    console.log('Number of students to import ', count);

    data.forEach(function(row) {
      var student = new Student({ badge: row[0], name : row[1]});
      students.saveStudent(student)
    });
});

