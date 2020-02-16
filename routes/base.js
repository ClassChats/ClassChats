let express = require('express');
let router = express.Router();

router.route('/')
	.get(function (req, res) {
		res.send('home');
	});

router.route('/login')
	.get(function (req, res) {
		res.render('loginPage.html');
	})
	.post(function (req, res) {
		let username = req.body.username;
		let password = req.body.password;
		
		if (username === undefined || password === undefined) {
			res.render('loginPage.html', { error: "You need to enter a username and password."});
		}

		verifyCredentials(username, password, function(err, verified) {
			if (err) {
				res.render('loginPage.html', { error: err});
				return;
			}
			
			getUserUniversity(username, function(err, university) {
				app.session.university = university;
				res.redirect('/' + university);
			})
		})
	});

router.route('/signup')
	.get(function (req, res){
		res.render('signUp.html');
	})
	.post(function (req, res){
		let username = req.body.username;
		let password = req.body.password;
		let passwordConfirm = req.body.passwordConfirm;
		
		if (username === undefined || password === undefined) {
			res.render('signup.html', { error: "You need to enter a username and password."});
			return;
		}
		if (password !== passwordConfirm) {
			res.render('signup.html', { error: "'Password' and 'Confirm Password' must match."});
			return;
		}
		
		createAccount(username, password, function(err, result) {
			if (err) {
				res.render('signup.html', { error: err});
			} else {
				res.redirect('/verify');
			}
		});
	});

router.route('/verify')
	.get(function (req, res) {
		render('verifyEmail.html');
	})
	.post(function (req, res) {
		let code = req.body.code;
		verify(username, code, function(err, verified) {
			let university = res.locals.domain;
			app.session.university = university;
			res.redirect('/' + university);
		});
	});