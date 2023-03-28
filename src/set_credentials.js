const { response, query } = require("express");
const mysql = require("mysql");
var connection = require("./database_connection");

const setCredentials = (req, response) => {
  // console.log(req.body);
  const query = "UPDATE userInfo SET username=?,password=? WHERE emailId=?;";
  connection.query(
    query,
    [
      req.body.exampleInputEmail1,
      req.body.exampleInputPassword1,
      req.body.exampleInputEmail0,
    ],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(results, fields);
        response.render("set_credentials", {
          message:
            "Your credentials have been set successfully, please visit login page to login.",
        });
      }
    }
  );
};

module.exports = setCredentials;
