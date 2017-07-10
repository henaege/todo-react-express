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

function validateKey(key){
	console.log(key)
	return new Promise((resolve, reject)=>{
		connection.query('SELECT * FROM api_keys WHERE api_key="'+key+'"',(error,results)=>{
			console.log(results.length)
			if (error) throw error;
			if(results.length == 0){
				resolve(false);
			}else{
				resolve(true);
			}
		});
	});
}

router.get('/getTasks', function(req, res, next) {
	var isKeyValid = validateKey(req.query.apiKey);
	isKeyValid.then((bool)=>{
		if(bool == true){
			connection.query('SELECT *, DATE_FORMAT(taskDate, "%M %D %Y") as Date FROM tasks', (error, results)=>{
				if (error) throw error;
				res.json(results);
			})
		}else{
			res.json({msg:"badKey"})
		}
	});
});

router.get('/getTask/:id', (req, res)=>{
  connection.query(`SELECT *, DATE_FORMAT(taskDate, "%M %D %Y") as Date FROM tasks WHEREid=${req.params.id};`,(error, results)=>{
    if (results.length == 0){
      res.json({msg: "no Result"})
    }else {
    res.json(results[0])
    }
  })
})

router.post('/completeTask',(req, res)=>{
	var targetId = req.body.targetId;
	connection.query('UPDATE tasks SET finished = NOT finished WHERE id=?',[targetId],(error, results, fields)=>{
		if(error) throw error;
		connection.query('SELECT * FROM tasks',(error2, results2, fields2)=>{
			res.json(results2)
		});		
	})
});

router.post('/deleteTask', (req, res)=>{
  connection.query('DELETE FROM tasks WHERE id=' + req.body.taskId, (error, results)=>{
    if(error) throw error
    res.json({
      msg: 'success'
    })
  })
})

router.post('/editTask', (req, res)=>{
  
  var taskNameToEdit = req.body.taskName
  var taskDateToEdit = req.body.taskDate
  var taskId = req.body.taskId
  console.log(taskNameToEdit)
  console.log(taskDateToEdit)
  console.log(taskId)
  connection.query(`REPLACE INTO tasks VALUES (${taskId}, "${taskNameToEdit}", "${taskDateToEdit}");`, (error, results)=>{
    if(error) throw error
    res.json({
      msg: 'success'
    })
    console.log("edited")
  })
})

// addStudent router. Expects a name in the body and will add that name to the students table, then respond with all students in that table.
router.post('/addTask', (req, res)=>{
  
  var taskNameToAdd = req.body.taskName
  var taskDateToAdd = req.body.taskDate
  connection.query('INSERT INTO tasks (taskName, taskDate) VALUES (?,?)', [taskNameToAdd, taskDateToAdd], (error, result)=>{
    if (error) throw error
    connection.query('SELECT * FROM tasks', (error2, results2)=>{
      if (error2) throw error2;
      res.json(results2)
    })
  })
})

module.exports = router;
