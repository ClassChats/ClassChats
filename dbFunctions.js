

function getChatsForCourse(domain, subject, number, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	connection.connect();

	// do the query
	// in the callback:
	// function(err, result)
	domain = domain.replace('.', '_')
	connection.query(`
		USE ${domain};
	`, function(err, result){
		if(err) throw err;
		connection.query(`
			SELECT courseid FROM Courses
			LEFT JOIN Subjects
			ON Courses.subjectid = Subjects.subjectid
			WHERE Subjects.name = '${subject}' AND Courses.number = '${number}';
			`, function(err, result) {
				if (err) throw err;
				if(result.length == 0){
					callback(null, []);
					return;
				}
				connection.query(`
					SELECT * FROM Chats LEFT JOIN Classes ON Classes.courseid=${courseid} LEFT JOIN Services on Chats.serviceid=Services.serviceid; 
				`, function(err, result){
					if(err) throw err;
					callback(null, result);
				})

			})
		//callback(null, result)
	})
}

function verifyCredentials(email, password, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	connection.connect();

	email = email.toLowerCase();
	connection.query(`
		USE Directory;
	`, function(err, result){
		if (err) throw err;
		connection.query(`
			SELECT COUNT(*) AS count FROM Users
			WHERE email = "${email}" AND password = "${password}";
		`,
		function(err, result){
			if(err) throw err;
			let verified = (result[0]['count'] != 0); 
			callback(null, verified)
		})
	})
}

function getUserUniversity(username, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	connection.connect();

	connection.query(`
		USE Directory;
	`, function(err, result){
		if(err) throw err;
		connection.query(`
			SELECT domain FROM 
			Users LEFT JOIN Schools 
			ON Users.schoolid = Schools.schoolid
		`, function(err, result){
			if(err) throw err;
			callback(null, result);
		})
	})
}

function createAccount(username, password, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	connection.connect();
	let verifyHash = Math.floor(100000 + Math.random() * 900000).toString(10);
	connection.query(`
		INSERT INTO Directory.Users(email, password, verifyHash) 
		VALUES ("${username}", "${password}", "${verifyHash}");
	`, callback)

}

function isCorrect(username, vCode, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	connection.connect();

	connection.query(`
		SELECT COUNT(*) AS count 
		FROM Directory.Users 
		WHERE email="${username}" AND verifyHash="${vCode}";
	`, function(err, result){
		if(err) throw err;
		if(result[0]['count'] != 0){
			connection.query(`
				UPDATE Directory.Users 
				SET verified=1, verifyHash=NULL
				WHERE email="${username}";
			`, function(err, result){
				if(err) throw err;
				var psl = require('psl');
				var parsed = psl.parse(username.split('@')[1]);
				domain = parsed.domain;
				connection.query(`
					INSERT IGNORE INTO Directory.Schools(domain)
					VALUES ("${domain}");
				`)
			})
		}
		else{
			callback(null, false);
		}
	})
}

function isUniversityNew(domain, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	connection.connect();
	connection.query(`
		SELECT COUNT(*) AS count
		FROM Directory.Schools 
		WHERE domain="${domain}"
		AND name IS NULL;
	`, function(err, result){
		if(err) throw err;
		//console.log(result)
		callback(null, result[0]['count'] != 0);
	})
}

function createUniversity(domain, universityName, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	connection.connect();
	connection.query(`
		UPDATE Directory.Schools 
		SET name="${universityName}"
		WHERE domain="${domain}" AND name IS NULL;
	`, callback);	
}
function addChat(courseNumber, section, startTime, days, roomNumber, building, professor, link, domain, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	domain = domain.sub('.','_');
	connection.query(`
		USE ${domain};
	`, function(err, result){
		if(err) throw err;
		connection.query(`
			INSERT IGNORE INTO Buildings(name)
			VALUES ("${building}");
		`, function(err, result){
			if(err) throw err;
			connection.query(`
				INSERT IGNORE INTO Rooms(number, buildingid)
				SELECT "${roomNumber}", buildingid
				FROM Buildings 
				WHERE Buildings.name = "${building}";
			`, function(err, result){
				if(err) throw err;
				connection.query(`
					INSERT IGNORE INTO Subjects(name)
					VALUES "${section}";
				`, function(err, result){
					if(err) throw err;
					connection.query(`
						INSERT IGNORE INTO Courses(number, subjectid)
						SELECT "${courseNumber}", subjectid
						FROM Subjects 
						WHERE Subjects.name = "${section}";
					`, function(err, result){
						if(err) throw err;
						connection.query(`
							INSERT IGNORE INTO Professors(name)
							VALUES ("${professor}");
						`, function(err, result){
							if(err) throw err;
							connection.query(`
								INSERT INTO Classes(courseid, section, startTime, days, roomid, professorid)
							`)
						})
					})
				})
			})
		})
	})


}


// on their side...
/*
getChatsForCourse("CSCI", "111", function(err, result) {
	if (err); // panic
	else renderResult(result);
})
*/

getChatsForCourse('cuny.edu', 'csci', '111', function(err, result){
	console.log('getChatsForCourse '+result)
})
let email = 'eric.sherman58@qmail.cuny.edu'
verifyCredentials(email, 'password', function(err, result){
	console.log('verifyCredentials '+ result)
})

getUserUniversity(email, function(err, result){
	console.log('getUserUniversity '+result)
})

/*
createAccount(email, 'password', function(err, result){
	console.log(result)
})

isCorrect(email, '557713', function(err, result){
	console.log(result)
})
*/
isUniversityNew('cuny.edu', function(err, result){
	console.log('isUniversityNew ' + result)
})