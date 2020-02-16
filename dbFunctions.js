var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 'password',
});

connection.connect();


function getChatsForCourse(domain, subject, number, callback){
	// do the query
	// in the callback:
	// function(err, result)
	domain = domain.replace('.', '_')
	connection.query(`
		USE ${domain};
	`, function(err, result){
		if(err) throw err;
		connection.query(`
			SELECT courseid FROM Course
			LEFT JOIN Subject 
			ON Course.subjectid = Subject.subjectid
			WHERE Subject.name = '${subject}' AND Course.number = '${number}';
			`, function(err, result) {
				if (err) throw err;
				let courseid = result[0]['courseid']
				connection.query(`
					SELECT * FROM Chats LEFT JOIN Class ON Class.courseid=${courseid} LEFT JOIN Services on Chats.serviceid=Services.serviceid; 
				`, function(err, result){
					if(err) throw err;
					callback(null, result);
				})

			})
		//callback(null, result)
	})
}


// on their side...
/*
getChatsForCourse("CSCI", "111", function(err, result) {
	if (err); // panic
	else renderResult(result);
})
*/

getChatsForCourse('cuny.edu', 'csci', '111')