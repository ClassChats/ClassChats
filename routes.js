const express = require('express')
const app = express()
const port = 3000

app.route('/') // handling a request
	.get(function (req, res) {
		res.render('index.html');
	})

app.route('/login')
	.get(function (req, res) {
		res.render('loginPage.html', { Error Message: "no login" });
	})
	.post(function (req, res) {
		let username = req.body.username;
		let password = req.body.password;

		if (verifyCredentials(username, password)) {
			let university = getUserUniversity(username);
			app.session.university = university;
			res.redirect('/' + university);
		} else {
			res.send('Invalid login')
		}
	})

app.route('/signup')
	.get(function (req, res)){
	res.render('signUp.html');

})
	.post(function (req, res)){
	let username = req.body.username;
	let password = req.body.password;

	createAccount(username, password);
	if (userCreated(username, password)) {
		res.redirect('/emailVerification');
	}
}
	})
app.route('/emailVerification')
	.get(function (req, res)) {
	render('verifyEmail.html');
}
	.post(function (req, res)) {
	let username = req.body.username;
	let vCode = req.body.verificationCode;
	if (isCorrect(username, vCode)) {
		let university = res.locals.domain;
		app.session.university = university;
		res.redirect('/' + university);
	}
}

app.route('/api/v1/university')
	.post(function (req, res)) {
	createUniversity(req.body.universityId, req.body.universityName)
	let university = res.locals.domain;
	app.session.university = university;
	res.redirect('/' + university);
}

app.route('/api/v1/university/chat') // for deleting the chat

app.route('/:university')
	.get(function (res, req)) {
	if (!universityExists(req.locals.domain)) {
		res.render('createUniversity.html', { university: req.session.university })
	}
	else {
		res.render('university.html', { university: req.session.university }
		}



})
//res.render('loginPage.html', {university: req.session.university}
app.route('/:university/search')
	.get((function (req, res)) {
	res.render('courseSearch.html');
	})
	.post(function (req, res)) {
	let department = req.body.departmentName;
	let courseNumber = req.body.courseNumber;
	getSearchResults(department, courseNumber)
	res.render('searchResults.html', {department: department, courseNumber : courseNumber})
}
app.route('/:university/AddChat')
	.get((function (req, res)) {
	res.render('addChat.html');
	})
	.post(function (req, res)) {
	let course = req.body.course;
	let section = req.body.section;
	let startTime = req.body.startTime;
	let days = req.body.days;
	let roomNumber = req.body.roomNumber;
	let building = req.body.building;
	let professor = req.body.room;
	let chatLink = req.body.chatLink;

	addChat(course, section, startTime, days, roomNumber, building, professor, chatLink);
	res.redirect('/:university/:subject/:courseNumber');
}
app.route('/:university/:subject/:courseNumber')
	.get(function (req, res)) {
	res.render('courseChats.html');
}

//write the paths and the functions associated with it


app.listen(port, () => console.log(`Example app listening on port ${port}!`))