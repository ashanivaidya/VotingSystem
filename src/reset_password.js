const mysql = require('mysql');
var connection = require('./database_connection');
var randtoken = require('rand-token');
const { response } = require('express');
const send = require('./send_email');

const verifyEmail = (request, response) => {
	// Capture the input field
	let email = request.body.email;

	if(email){
		connection.query('SELECT * FROM userInfo WHERE email = ?', [email], function(err, results,fields){
				// checks to see if there is an account with that email
				if(results.length > 0){
					var token = randtoken.generate(20);
					var subject = 'Reset Password Link - votingsystem';
					var message = '<p> Click <a href = "http://localhost:3000/update_password?token=' + token + '">here</a> to reset your password and enter the token: ' + token + '</p>';
					var sent = send.sendEmail(email, token,subject,message);
					connection.query('UPDATE userInfo SET Token =? where email = ?', [token, email], function(err, results,fields){})
					response.send("The reset password link has been sent to your email");
					response.end();
				}
				else{
					// user enters incorrect email
					response.send('There is no account associated with that email address');
					response.end();
				}
		})
	}
};

module.exports =  verifyEmail;  
