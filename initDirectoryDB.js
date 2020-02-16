function createDB(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});


	connection.connect();
	/*
	connection.query('USE GradeNotifier;', function (err, result){
		if(err) throw err;
		console.log(result)
	});
	connection.query('SELECT * FROM Users;', function (err, result){
		if(err) throw err;
		console.log(result)
	});
	*/
	
	connection.query(`
		CREATE DATABASE Directory IF NOT EXISTS;
	`);
	connection.query(`
	    USE Directory;
	`);
	connection.query(`
		CREATE TABLE IF NOT EXISTS School (schoolid int NOT NULL AUTO_INCREMENT,name VARCHAR(255) NOT NULL,domain VARCHAR(255) NOT NULL,PRIMARY KEY (schoolid));
	`)	
	/*
	connection.query(`
		CREATE TABLE IF NOT EXISTS Users(
			userid int NOT NULL AUTO_INCREMENT,
			email VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			schoolid int NOT NULL,
			verified bit NOT NULL DEFAULT 0,
			verifyHash VARCHAR(255),
			PRIMARY KEY (userid),
			FOREIGN KEY (schoolid) REFERENCES School(schoolid)
		);
	`);
	*/
	
}

createDB();