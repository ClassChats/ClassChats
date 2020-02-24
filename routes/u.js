let express = require('express');
let router = express.Router();

let dbFunctions = require('../drivers/dbFunctions');

router.route('/:university').get(function(req, res) {
    // if (!dbFunctions.universityExists(req.locals.domain)) {
    // 	res.render('create', { university: req.session.university })
    // }
    // else {
    dbFunctions.getChatsForUniversity(req.params.university, function(
        err,
        result,
    ) {
        if (err) return res.send(err);

        res.render('university', { university: req.params.university, result });
    });
    // }
});

//res.render('loginPage.html', {university: req.session.university}
router
    .route('/:university/search')
    .get(function(req, res) {
        res.render('search');
    })
    .post(function(req, res) {
        let domain = req.params.university;
        let subject = req.body.subjectName;
        let courseNumber = req.body.courseNumber;
        dbFunctions.getChatsForCourse(domain, subject, courseNumber, function(
            err,
            result,
        ) {
            if (err) return res.send(err);
            res.render('search', {
                department: subject,
                courseNumber: courseNumber,
            });
        });
    });

router
    .route('/:university/add')
    .get(function(req, res) {
        res.render('add', { domain: req.params.university });
    })
    .post(function(req, res) {
        let body = req.body;
        console.log;

        let username = req.session.username;
        let subject = body.dept;
        let course = body.courseNumber;
        let section = body.section;
        let startTime = body.startTime;
        let roomNumber = body.roomNumber;
        let building = body.building;
        let professor = body.room;
        let domain = req.params.university;
        let chatLink = '';

        let days =
            +(body.saturday === 'saturday') +
            +(body.friday === 'friday') * 2 +
            +(body.thursday === 'thursday') * 4 +
            +(body.wednesday === 'wednesday') * 8 +
            +(body.tuesday === 'tuesday') * 16 +
            +(body.monday === 'monday') * 32 +
            +(body.sunday === 'sunday') * 64;

        dbFunctions.addChat(
            subject,
            course,
            section,
            startTime,
            days,
            roomNumber,
            building,
            professor,
            chatLink,
            domain,
            username,
            function(err, result) {
                if (err) return res.send(err);

                res.redirect('/u/' + domain + '/' + subject + '/' + course);
            },
        );
    });

router.route('/:university/:subject/:courseNumber').get(function(req, res) {
    res.render('course');
});

module.exports = router;
