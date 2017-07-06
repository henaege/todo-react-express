var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'x',
  password: 'x',
  database: 'todo'
})

connection.connect()

// Set up a route to handle React's first request
router.get('/getStudents', function(req, res, next) {
  connection.query('SELECT * FROM students', (error, results)=>{
    if (error) throw error;
    res.json(results)
  })
});

// addStudent router. Expects a name in the body and will add that name to the students table, then respond with all students in that table.
router.post('/addStudent', (req, res)=>{
  var studentToAdd = req.body.name
  connection.query('INSERT INTO students (name) VALUES (?)', [studentToAdd], (error, result)=>{
    if (error) throw error
    connection.query('SELECT * FROM students', (error2, results2)=>{
      if (error2) throw error2;
      res.json(results2)
    })
  })
})

module.exports = router;
