

function createDB(domain){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});


	connection.connect();

	connection.query(`

		IF DB_ID('${domain}') IS NULL
		BEGIN
		    CREATE DATABASE ${domain};
		    USE ${domain};

		    CREATE TABLE Subject (
		    	subjectid int NOT NULL AUTO_INCREMENT,
		    	name NVARCHAR NOT NULL,
		    	PRIMARY KEY (subjectid)
		    );

		    CREATE TABLE Course (
		    	courseid int NOT NULL AUTO_INCREMENT,
		    	subjectid int NOT NULL,
		    	number NVARCHAR NOT NULL,
		    	PRIMARY KEY (courseid),
		    	FOREIGN KEY (subjectid) REFERENCES Subject (subjectid)
		    );

		    CREATE TABLE Building (
		    	buildingid int NOT NULL AUTO_INCREMENT,
		    	name NVARCHAR,
		    	PRIMARY KEY (buildingid)
		    );

		    CREATE TABLE Room (
		    	roomid int NOT NULL AUTO_INCREMENT,
		    	number NVARCHAR NOT NULL,
		    	buildingid int NOT NULL,
		    	coordinates Point,
		    	PRIMARY KEY (roomid),
		    	FOREIGN KEY (buildingid) REFERENCES Building (buildingid)

		    );

		    CREATE TABLE Service (
		    	serviceid int NOT NULL AUTO_INCREMENT,
		    	name NVARCHAR NOT NULL,
		    	PRIMARY KEY (serviceid)
		    );

		    CREATE TABLE Chats (
		    	classid int NOT NULL,
		    	userid int NOT NULL,
		    	link NVARCHAR NOT NULL,
		    	serviceid int,
		    	FOREIGN KEY (serviceid) REFERENCES Service (serviceid)
		    	FOREIGN KEY (userid) REFERENCES Directory.Users(userid)
		    );


		    CREATE TABLE Class (
		    	classid int NOT NULL AUTO_INCREMENT,
		    	courseid int NOT NULL,
		    	section NVARCHAR,
		    	startTime time,
		    	days TINYINT,
		    	roomid int,
		    	professorid int NOT NULL,
		    	PRIMARY KEY (classid),
		    	FOREIGN KEY (courseid) REFERENCES Course(courseid),
		    	FOREIGN KEY (roomid) REFERENCES Room(roomid),
		    	FOREIGN KEY (professorid) REFERENCES Professor(professorid)

		    );


		END

	`)

}