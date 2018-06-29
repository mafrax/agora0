var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('register');
});

router.get('/test/', function(req, res, next) {
	  res.render('profile');
	});


router.get('/test2/', function(req, res, next) {
	  res.render('profile2');
	});

module.exports = router;
