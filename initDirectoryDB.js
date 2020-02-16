function createDB(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'dbuser',
	  password : 'password',
	});


	connection.connect();

	connection.query(`
		CREATE DATABASE IF NOT EXISTS Directory ;
	`, function(err, result){
		if (err) throw err;
		connection.query(`
		    USE Directory;
		`, function(err, result){
			if (err) throw err;
			connection.query(`		
				CREATE TABLE IF NOT EXISTS Schools (
					schoolid int NOT NULL AUTO_INCREMENT,
					name VARCHAR(255) NOT NULL UNIQUE,
					domain VARCHAR(255) NOT NULL,
					PRIMARY KEY (schoolid)
				);
			`, function(err, result){
				if (err) throw err;
				connection.query(`
					CREATE TABLE IF NOT EXISTS Users(
						userid int NOT NULL AUTO_INCREMENT,
						email VARCHAR(255) NOT NULL,
						password VARCHAR(255) NOT NULL,
						schoolid int,
						verified bit NOT NULL DEFAULT 0,
						verifyHash VARCHAR(255),
						PRIMARY KEY (userid),
						FOREIGN KEY (schoolid) REFERENCES Schools(schoolid)
					);
				`, function(err, result){
					if(err) throw err;
					console.log('ALL DONE!')
				})
			})	
		});
	});
}

createDB();