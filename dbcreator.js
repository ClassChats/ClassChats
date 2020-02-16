

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
				    CREATE TABLE IF NOT EXISTS Subject (
				    	subjectid int NOT NULL AUTO_INCREMENT,
				    	name VARCHAR(255) NOT NULL,
				    	PRIMARY KEY (subjectid)
				    );
				`, function(err, result){
					if (err) throw err;
					connection.query(`
					    CREATE TABLE IF NOT EXISTS Course (
					    	courseid int NOT NULL AUTO_INCREMENT,
					    	subjectid int NOT NULL,
					    	number VARCHAR(255) NOT NULL,
					    	PRIMARY KEY (courseid),
					    	FOREIGN KEY (subjectid) REFERENCES Subject (subjectid)
					    );
					`, function(err, result){
						if (err) throw err;
						connection.query(`
						    CREATE TABLE IF NOT EXISTS Building (
						    	buildingid int NOT NULL AUTO_INCREMENT,
						    	name VARCHAR(255),
						    	PRIMARY KEY (buildingid)
						    );
						`, function(err, result){
							if (err) throw err;
							connection.query(`
							    CREATE TABLE IF NOT EXISTS Room (
							    	roomid int NOT NULL AUTO_INCREMENT,
							    	number VARCHAR(255) NOT NULL,
							    	buildingid int NOT NULL,
							    	coordinates Point,
							    	PRIMARY KEY (roomid),
							    	FOREIGN KEY (buildingid) REFERENCES Building (buildingid)

							    );
							`, function(err, result){
								if(err) throw err;
								connection.query(`
								    CREATE TABLE IF NOT EXISTS Service (
								    	serviceid int NOT NULL AUTO_INCREMENT,
								    	name VARCHAR(255) NOT NULL,
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
									    	FOREIGN KEY (serviceid) REFERENCES Service (serviceid),
									    	FOREIGN KEY (userid) REFERENCES Directory.Users(userid)
									    );				
									`, function(err, result){
										if(err) throw err;
										connection.query(`
										    CREATE TABLE IF NOT EXISTS Professor (
										    	professorid int NOT NULL AUTO_INCREMENT,
										    	name VARCHAR(255) NOT NULL,
										    	PRIMARY KEY (professorid)
										    )
										`, function(err, result){
											if(err) throw err;
											connection.query(`
												CREATE TABLE IF NOT EXISTS Class (
											    	classid int NOT NULL AUTO_INCREMENT,
											    	courseid int NOT NULL,
											    	section VARCHAR(255),
											    	startTime time,
											    	days TINYINT,
											    	roomid int,
											    	professorid int NOT NULL,
											    	PRIMARY KEY (classid),
											    	FOREIGN KEY (courseid) REFERENCES Course(courseid),
											    	FOREIGN KEY (roomid) REFERENCES Room(roomid),
											    	FOREIGN KEY (professorid) REFERENCES Professor(professorid)
										    	);
											`, function(err, result){
												if(err) throw err;
												console.log('all done!')
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