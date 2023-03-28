const mysql = require('mysql');
var connection = require('./database_connection');
const { response } = require('express');

const createPrecinct = (request, response) => {
    // getting information from form
    let userID = request.body.userID;
    let name = request.body.name;
    let zip = request.body.zip;
    let start4 = request.body.start4;
    let end4 = request.body.end4;

    //inserting data into Precincts
    let queryString = `INSERT INTO precincts (precMan_id, Precinct, Zipcode, Plus_4_Start, Plus_4_End) values ('${userID}', '${name}','${zip}', '${start4}, '${end4});`
    connection.query(queryString, function(error, results){});

}

module.exports = createPrecinct;
