

function createDB(domain){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});


	connection.connect();

	connection.query(`
	    CREATE DATABASE IF NOT EXISTS ${domain};
	`, function(err, result){
		if(err) throw err;
		connection.query(`
			USE ${domain};
		`,  function(err, result){
				if (err) throw err;
				connection.query(`
				    CREATE TABLE IF NOT EXISTS Subjects (
				    	subjectid int NOT NULL AUTO_INCREMENT,
				    	name VARCHAR(255) NOT NULL UNIQUE,
				    	PRIMARY KEY (subjectid)
				    );
				`, function(err, result){
					if (err) throw err;
					connection.query(`
					    CREATE TABLE IF NOT EXISTS Courses (
					    	courseid int NOT NULL AUTO_INCREMENT,
					    	subjectid int NOT NULL,
					    	number VARCHAR(255) NOT NULL,
					    	PRIMARY KEY (courseid),
					    	FOREIGN KEY (subjectid) REFERENCES Subjects (subjectid),
					    	CONSTRAINT COURSES_UC UNIQUE (subjectid, number)
					    );
					`, function(err, result){
						if (err) throw err;
						connection.query(`
						    CREATE TABLE IF NOT EXISTS Buildings (
						    	buildingid int NOT NULL AUTO_INCREMENT,
						    	name VARCHAR(255),
						    	PRIMARY KEY (buildingid)
						    );
						`, function(err, result){
							if (err) throw err;
							connection.query(`
							    CREATE TABLE IF NOT EXISTS Rooms (
							    	roomid int NOT NULL AUTO_INCREMENT,
							    	number VARCHAR(255) NOT NULL,
							    	buildingid int NOT NULL,
							    	coordinates Point,
							    	PRIMARY KEY (roomid),
							    	FOREIGN KEY (buildingid) REFERENCES Buildings (buildingid),
							    	CONSTRAINT ROOM_UC UNIQUE(buildingid, number)
							    );
							`, function(err, result){
								if(err) throw err;
								connection.query(`
								    CREATE TABLE IF NOT EXISTS Services (
								    	serviceid int NOT NULL AUTO_INCREMENT,
								    	name VARCHAR(255) NOT NULL UNIQUE,
								    	PRIMARY KEY (serviceid)
								    );		
								`, function(err, result){
									if(err) throw err;
									connection.query(`
									    CREATE TABLE IF NOT EXISTS Chats (
									    	classid int NOT NULL,
									    	userid int NOT NULL,
									    	link VARCHAR(255) NOT NULL,
									    	serviceid int,
									    	FOREIGN KEY (serviceid) REFERENCES Services (serviceid),
									    	FOREIGN KEY (userid) REFERENCES Directory.Users(userid)
									    );				
									`, function(err, result){
										if(err) throw err;
										connection.query(`
										    CREATE TABLE IF NOT EXISTS Professors (
										    	professorid int NOT NULL AUTO_INCREMENT,
										    	name VARCHAR(255) NOT NULL UNIQUE,
										    	PRIMARY KEY (professorid)
										    )
										`, function(err, result){
											if(err) throw err;
											connection.query(`
												CREATE TABLE IF NOT EXISTS Classes (
											    	classid int NOT NULL AUTO_INCREMENT,
											    	courseid int NOT NULL,
											    	section VARCHAR(255),
											    	startTime time,
											    	days TINYINT,
											    	roomid int,
											    	professorid int NOT NULL,
											    	PRIMARY KEY (classid),
											    	FOREIGN KEY (courseid) REFERENCES Courses(courseid),
											    	FOREIGN KEY (roomid) REFERENCES Rooms(roomid),
											    	FOREIGN KEY (professorid) REFERENCES Professors(professorid)
										    	);
											`, function(err, result){
												if(err) throw err;
												connection.query(`INSERT INTO Services(name)
													VALUES 
													("whatsapp"), 
													("telegram"), 
													("groupme"), 
													("signal"),
													("messenger"),
													("wechat");
												`, function(err, result){
													if(err) throw err;
													console.log('complete!')
												})
											})
										})
									})
								})
							})
						})
					})
				})
		})
	});

}




createDB('cuny_edu')