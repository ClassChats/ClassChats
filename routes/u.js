let express = require('express');
let router = express.Router();

router.route('/:university')
	.get(function (res, req) {
		if (!universityExists(req.locals.domain)) {
			res.render('createUniversity.html', { university: req.session.university })
		}
		else {
			res.render('university.html', { university: req.session.university })
		}
	});

//res.render('loginPage.html', {university: req.session.university}
router.route('/:university/search')
	.get(function (req, res) {
		res.render('courseSearch.html');
	})
	.post(function (req, res) {
		let domain = res.locals.domain;
		let subject = req.body.subjectName;
		let courseNumber = req.body.courseNumber;
		getChatsForCourse(domain, subject, courseNumber)
		res.render('searchResults.html', {department: department, courseNumber : courseNumber})
	});

router.route('/:university/add')
	.get(function (req, res) {
		res.render('addChat.html');
	})
	.post(function (req, res) {
		let username = req.session.username;
		let subject = req.body.subject;
		let course = req.body.course;
		let section = req.body.section;
		let startTime = req.body.startTime;
		let days = req.body.days;
		let roomNumber = req.body.roomNumber;
		let building = req.body.building;
		let professor = req.body.room;
		let chatLink = req.body.chatLink;
		let domain = res.locals.domain;

		addChat(subject, course, section, startTime, days, roomNumber, building, professor, chatLink, domain, username);
		res.redirect('/:university/:subject/:courseNumber');
	})

router.route('/:university/:subject/:courseNumber')
	.get(function (req, res) {
		res.render('courseChats.html');
	});


module.exports = router;