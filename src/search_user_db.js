const { response } = require('express');
const mysql = require('mysql');
var connection = require('./database_connection');

const search  = (request, response) => {
	// Capture the input fields
	let firstname = request.body.firstname;
	let lastname = request.body.lastname;
	let street = request.body.street;
	let city = request.body.city;
	let zip = request.body.zip;
	let license = request.body.license;
	let passport = request.body.passport;
	let voterID = request.body.voterid;
	let username = request.body.username;
	let email = request.body.email;
	
	
		
		// Execute SQL query that'll select the account from the database based on the specified username and password
		let sql = 'SELECT * FROM userInfo WHERE 1=1'
				if (firstname != ""){sql = sql+' AND firstname = "'+firstname+'"';}
				if (lastname != ""){sql = sql+' AND lastname = "'+lastname+'"';}
				if (street != ""){sql = sql+' AND address = "'+street+'"';}
				if (city != ""){sql = sql+' AND city = "'+city+'"';}
				if (zip != ""){sql = sql+' AND zip = "'+zip+'"';}
				if (license != "" && license != null){sql = sql+' AND drivers-license = "'+license+'" OR drivers-license IS NULL';}
				if (passport != ""){sql = sql+' AND passport = "'+passport+'" OR passport IS NULL';}
				if (voterID != ""){sql = sql+' AND voterID = "'+voterID+'" OR voterID IS NULL';}
				if (username != ""){sql = sql+' AND username = "'+username+'"';}
				if (email != ""){sql = sql+' AND email = "'+email+'"';}
		connection.query(sql, function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
		
			if (results.length > 0) {
				//check if account locked
				console.log(results[0]);
				response.render('search_user_db',{results: results});
			} else {
				response.render('search_user_db',{text: 'no user with that info'});
				console.log(sql);
			}
			response.end();
		});
	
};

module.exports = search;   
