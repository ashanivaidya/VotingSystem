const mysql = require('mysql');
var connection = require('./database_connection');

const updatePassword = (request, response) => {
    let token = request.body.token;
	let password = request.body.password;
    let password2 = request.body.password2;
    
    if(token && password && password2){
        if(password == password2){
            connection.query('UPDATE userInfo SET password = ? where token = ?',[password, token], function(err, results,fields){});
            connection.query('UPDATE userInfo SET failedLoginAttempts = ? where token = ?',[0, token], function(err, results,fields){});
        }
        else{   
            response.send('The password you entered is not the same in both boxes');
            response.end();
        }
        response.redirect('/');
    }
};

module.exports = updatePassword;  