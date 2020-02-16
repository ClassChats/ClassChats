

function bsToDays(bitstring){
	var days = "";
	dayArray=['S','M', 'T', 'W', 'TH', 'F', 'SA']
	for(var i = 0; i < 7; i++){
		if(bitstring[i] == '1'){
			days += dayArray[i]+'/';
		}
	}
	return days.substring(0, days.length-1);
}

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
					SELECT Subjects.name as subjectName,
					Courses.number as courseNumber,
					LPAD(CONV(Classes.days, 10, 2),7,'0') as daysOfWeek,
					Rooms.number as roomNumber,
					Buildings.name as buildingName,
					Classes.section AS section,
					Professors.name AS professorName,
					Services.name as serviceName,
					Chats.link as link,
					Classes.startTime AS startTime



					FROM Classes
					LEFT JOIN Courses ON
					Classes.courseid = Courses.courseid 
					LEFT JOIN Subjects ON
					Courses.subjectid = Subjects.subjectid
					LEFT JOIN Professors ON
					Classes.professorid = Professors.professorid
					LEFT JOIN Rooms ON Classes.roomid = Rooms.roomid
					LEFT JOIN Buildings ON Rooms.buildingid = Buildings.buildingid
					LEFT JOIN Chats ON Classes.classid = Chats.classid
					LEFT JOIN Services ON Chats.serviceid = Services.serviceid
					WHERE Subjects.name = "${subject}" AND Courses.number = "${number}"
				`, function(err, result){
					if(err) throw err;
					for(var i = 0; i < result.length; i++){
						result[i].daysOfWeek =bsToDays(result[i].daysOfWeek);
					}
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
			SELECT Schools.domain, Schools.name FROM 
			Users LEFT JOIN Schools 
			ON Users.schoolid = Schools.schoolid
		`, function(err, result){
			if(err) throw err;
			console.log(result[0]);
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

function verify(username, vCode, callback){
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
		if(err) {
			callback(err);
			return;
		}
		
		if(result[0]['count'] != 0){
			connection.query(`
				UPDATE Directory.Users 
				SET verified=1, verifyHash=NULL
				WHERE email="${username}";
			`, function(err, result){
				if(err) {
					callback(err);
					return;
				}
				
				var psl = require('psl');
				var parsed = psl.parse(username.split('@')[1]);
				domain = parsed.domain;
				connection.query(`
					INSERT IGNORE INTO Directory.Schools(domain)
					VALUES ("${domain}");
				`, function(err, result) {
					if (err) {
						callback(err);
						return;
					}
					
					connection.query(`
						UPDATE Directory.Users
						SET schoolid = (SELECT schoolid FROM Directory.Schools WHERE domain = '${domain}')
						WHERE email = '${username}';
					`, function(err, result) {
						if (err) {
							callback(err);
							return;
						}
						callback(null, true);
					});
				});
			});
		}
		else{
			callback('More than one user was found for this -- this should not happen.');
		}
	});
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


function getServiceByURL(link){
	const url = require('url');
	var parsed = url.parse(link);
	var hostname = parsed.hostname;
	var psl = require('psl');
	var domain = psl.parse(hostname).domain
	if(domain == 't.me'){
		return 'telegram';
	}
	else if(domain=='whatsapp.com'){
		return 'whatsapp';
	}
	else{
		return 'messenger';
	}
}

function addChat(subject, courseNumber, section, startTime, days, roomNumber, building, professor, link, domain, username, callback){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});

	domain = domain.replace('.','_');
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
					VALUES ("${subject}");
				`, function(err, result){
					if(err) throw err;
					connection.query(`
						INSERT IGNORE INTO Courses(number, subjectid)
						SELECT "${courseNumber}", subjectid
						FROM Subjects 
						WHERE Subjects.name = "${subject}";
					`, function(err, result){
						if(err) throw err;
						connection.query(`
							INSERT IGNORE INTO Professors(name)
							VALUES ("${professor}");
						`, function(err, result){
							if(err) throw err;

							//console.log(courseNumber, section, startTime, days, roomNumber, building, professor, link, domain)
							connection.query(`
								INSERT IGNORE INTO Classes(courseid, section, startTime, days, roomid, professorid)
								SELECT (SELECT courseid FROM Courses LEFT JOIN Subjects on Courses.subjectid=Subjects.subjectid WHERE name="${subject}" AND number="${courseNumber}") as courseid,
								"${section}" as section,
								${startTime} as startTime,
								${days} as days,
								(SELECT roomid FROM Rooms LEFT JOIN Buildings ON Rooms.buildingid = Buildings.buildingid WHERE name="${building}" AND number="${roomNumber}" ) AS roomid,
								(SELECT professorid FROM Professors WHERE name = "${professor}") AS professorid;
							`, function(err, result){
								if(err) throw err;
								var serviceName = getServiceByURL(link);
								connection.query(`
									INSERT INTO Chats(classid, userid, link, serviceid)
									SELECT (SELECT classid 
									FROM Classes 
									WHERE
									professorid = (SELECT professorid FROM Professors WHERE name = "${professor}")
									AND
									roomid = (SELECT roomid FROM Rooms LEFT JOIN Buildings ON Rooms.buildingid = Buildings.buildingid WHERE name="${building}" AND number="${roomNumber}" )
									AND 
									days <=> ${days}
									AND
									startTime <=> ${startTime}
									AND
									section = "${section}"
									AND 
									courseid = (SELECT courseid FROM Courses LEFT JOIN Subjects on Courses.subjectid=Subjects.subjectid WHERE name="${subject}" AND number="${courseNumber}")
									) AS classid,
									(SELECT userid FROM Directory.Users WHERE email="${username}"),
									"${link}",
									(SELECT serviceid FROM Services WHERE name="${serviceName}") 
								`, function(err, result){
									if(err) throw err;
								})
							})
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

/*

let email = 'eric.sherman58@qmail.cuny.edu'
createAccount(email, 'password', function(err, result){
	console.log(result)
})

isCorrect(email, '557713', function(err, result){
	console.log(result)
})

verifyCredentials(email, 'password', function(err, result){
	console.log('verifyCredentials '+ result)
})

getUserUniversity(email, function(err, result){
	console.log('getUserUniversity '+result)
})



isUniversityNew('cuny.edu', function(err, result){
	console.log('isUniversityNew ' + result)
})

//addChat(subject, courseNumber, section, startTime, days, roomNumber, building, professor, link, domain, callback)

*/

// addChat('CSCI','320', '1A', null, 40, '017', 'Remsen Hall', 'Bojana Obrenic', 'http://t.me/uewhduwbe', 'cuny.edu', 'eric.sherman58@qmail.cuny.edu',function(err, result){
// 	//console.log(result)
// })
// getChatsForCourse('cuny.edu', 'csci', '320', function(err, result){
// 	console.log(result)
// })

getChatsForCourse('cuny.edu','CSCI','320', function(err, result){
	if(err) throw err;
	console.log(result)
})