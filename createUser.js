var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 'password',
});

var psl = require('psl');

function createUniversity(domain, name){
	connection.query(`
		INSERT INTO Directory.Schools(domain, name) VALUES ("${domain}", "${name}");
	`, function(err, result){
		if(err) throw err;
		console.log(`${name} created with domain ${domain}`);
	});
}

function createUser(email, password){
	var parsed = psl.parse(email.split('@')[1]);
	connection.query(`
		INSERT INTO Directory.Users(email, password)
		VALUES ("${email}", "${password}");
	`, function(err, result){
		if(err) throw err;
		console.log(`user ${email} created`)
	});
}

createUniversity('cuny.edu', 'City University of New York')
createUser('eric.sherman58@qmail.cuny.edu', 'password')