var nodemailer = require('nodemailer');
//var randtoken = require('rand-token');

function sendEmail(email, token, subject, message){
	var email = email;
	var token = token;

	var mail = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'team11.votingsystem@gmail.com',
			pass: '22Team11!'
		}
	});

	var mailOptions = {
		from: 'team11.votingsystem@gmail.com',
		to: email,
		subject: subject,
		html: message
	};

	mail.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(1);
		}
		else{
			console.log(0);
			
		}
	});
}
module.exports = {sendEmail};
