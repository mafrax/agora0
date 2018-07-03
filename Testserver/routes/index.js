var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver');

/* GET home page. */

var driver = neo4j.v1.driver("bolt://localhost:7687", neo4j.v1.auth.basic("neo4j", "mafrax"));
var session = driver.session();


router.get('/', function(req, res, next) {

  console.log('TEST');	
  session
  .run('MATCH(n:Person) RETURN n')
  .then(function(result){
	  result.records.forEach(function(record){
		  console.log(record);
	  });
  })
  .catch( function(err){
	  console.log(err);
  });
  
  res.render('test');
});


router.get('/test/', function(req, res, next) {
	  res.render('profile');
	});


router.get('/test2/', function(req, res, next) {
	  res.render('profile2');
	});


router.post('/register', function(req, res, next) {
		console.log(req.body);
		
		var firstname = req.body.first_name;
		var lastname = req.body.last_name;
		var password = req.body.password;
		var email = req.body.email;
		var birthday = req.body.datetimepicker;
		var acceptedTerms = req.body.optionsCheckboxes;

		
		session.run('CREATE(n:User {firstname:{firstnameParameter}, lastname:{lastnameParameter}, password:{passwordParameter}, email:{emailParameter}}) RETURN n.lastname'
				, {firstnameParameter:firstname,lastnameParameter:lastname, passwordParameter:password, emailParameter:email })
		.then(function(result){
			
			session.close();
			})
		.catch( function(err){
			  console.log(err);
		  });
		
		console.log(firstname);
		
		res.redirect('/');
	});

module.exports = router;
