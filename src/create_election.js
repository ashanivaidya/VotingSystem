const mysql = require('mysql');
var connection = require('./database_connection');
const { response } = require('express');
var randtoken = require('rand-token');

const createElection = (request, response) => {
    // getting information from form
    let adminID = request.body.adminID;
    let title = request.body.title;
    let state = request.body.state_selection;
    let startDate = request.body.startDate;
    let endDate = request.body.endDate;
    let position = request.body.position_selection;
    let precincts = request.body.precincts;
    let candidates = request.body.candidates;
    

    // separating the lists of candidates, precincts and start/end dates
    let precinctList = new Array();
    precinctList = precincts.split(", ");
    let candidateList = new Array();
    candidateList= candidates.split(", ");
    let startDateList = startDate.split("-");
    let endDateList = endDate.split("-");
    let startYear = startDateList[0];
    let startMonth = startDateList[1];
    let startDay = startDateList[2];
    let endYear = endDateList[0];
    let endMonth = endDateList[1];
    let endDay = endDateList[2];

    //generating ids
    let election_id = randtoken.generate(5);
    //let precinct_list_id = randtoken.generate(5);
    let candidate_list_id = randtoken.generate(5);

    //inserting data into elections
    let queryString = `INSERT INTO elections (election_id, title) values ('${election_id}','${title});`
    connection.query(queryString, function(error, results){});

    //inserting data into ElectionInfo
    let queryString2 = `INSERT INTO electionInfo (election_id, title, state, start_MM, start_DD, start_YYYY, end_MM, end_DD, end_YYYY, precinct_list_id, candidate_list_id, position, candidates, precincts) values ('${election_id}', '${title}', '${state}', '${startMonth}', '${startDay}', '${startYear}', '${endMonth}', '${endDay}', '${endYear}', '${'hkgvjhb'}', '${candidate_list_id}', '${position}', '${candidates}', '${precincts}');`
    connection.query(queryString2, function(error, results, fields){})

    // inserting precincts into PrecinctList
    for (let i = 0; i<precinctList.length; i++){
        let precinct_id = precinctList[i];
        let queryString3 = `INSERT INTO precinctList (election_id, precinct_id) values ('${election_id}', '${precinct_id}');`
        connection.query(queryString3, function(error, results, fields){});
    }

    // inserting cadidates into Candidate List
    for(let i = 0; i<candidateList.length; i++){
       let name = candidateList[i];
       let queryString4 = `INSERT INTO candidateList (candidate_list_id, name) values ('${candidate_list_id}', '${name}');`
        connection.query(queryString4, function(error, results,fields){});
    }
    return [election_id,candidate_list_id];
}

module.exports = createElection;
