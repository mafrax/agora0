var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
	console.log('TEST');	
	res.render('test');
});

router.get('/test/', function(req, res, next) {
	  res.render('profile');
	});


router.get('/test2/', function(req, res, next) {
	  res.render('profile2');
	});


router.post('/register', function(req, res, next) {
		console.log('TESTTEST');
		res.render('register');
	});

module.exports = router;
