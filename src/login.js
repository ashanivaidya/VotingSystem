const { response } = require('express');
const mysql = require('mysql');
const path = require('path');
var connection = require('./database_connection');

const login  = (request, response) => {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	
	// Ensure the input fields exists and are not empty
	if (username && password) {
		
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT userType, failedLoginAttempts FROM userInfo where username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
		
			if (results.length > 0) {
				//check if account locked
				console.log(results[0]);
				if (results[0].failedLoginAttempts > 3){
					console.log('46');
					response.render('login',{results: 'your account has been locked due to failed login attempts, please click forgot password to reset your password and unlock your account'});
					response.end();
				}
				else{
					//reset failed login attempts if any
					connection.query('UPDATE userInfo SET failedLoginAttempts = ? WHERE username = ?', [0, username], function(error, results, fields){
							if (error) throw error;
						
						});
					// Redirect to admin home page 
					if (results[0].userType == 'admin'){
						response.redirect('/admin_home');
					}
					//Redirect to voter home page
					else if(results[0].userType == 'voter'){
						response.redirect('/voter_home');
					}
					//Redirect to precinct manager home page
					else if(results[0].userType == 'precMan'){
						response.redirect('/precMan_home');
					}
					else{
						response.end();
					}
				}
			} else {
				// user enters incorrect username or password
				
				//query for username match
				connection.query('SELECT failedLoginAttempts FROM userInfo where username = ?', [username], function(error, results, fields) {
					if (error) throw error;
					// If the username exists
					
					if (results.length > 0) {
						x = results[0].failedLoginAttempts
						//update the number of failed login attempts for that username
						console.log(x);
						connection.query('UPDATE userInfo SET failedLoginAttempts = ? WHERE username = ?', [x+1, username], function(error, results, fields){
							if (error) throw error;
						
						});
					}
					
				});
				console.log('l');
				response.render('login',{results: 'Incorrect Username and/or Password!'});
				console.log('71');
			}
			response.end();
		});
	} else {
		//user doesn't enter anything into the inputs
		response.render('login',{results: 'Please enter Username and Password!'});
		response.end();
	}
};

module.exports = login;   
