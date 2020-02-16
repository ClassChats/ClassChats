var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 'password',
});

connection.connect();


function getChatsForCourse(subject, number, callback){
	// do the query
	// in the callback:
	// function(err, result)
	connection.query(`
		SELECT * FROM Course
		LEFT JOIN Subject 
		ON Course.subjectid = Subject.subjectid;
		WHERE Subject.name = '${subject}' AND Course.number = '${number}';
		`, function(err, result) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, result)
	})
}


// on their side...
/*
getChatsForCourse("CSCI", "111", function(err, result) {
	if (err); // panic
	else renderResult(result);
})
*/