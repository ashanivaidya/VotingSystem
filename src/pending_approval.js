const { response, query } = require("express");
const express = require("express");
const mysql = require("mysql");
const path = require("path");
var connection = require("./database_connection");
const app = express();
// app.use(express.static(path.join(__dirname, "upload")));
// app.use(express.static("upload"));
// const path = require("path");
app.use("/upload", express.static(path.join(__dirname, "upload")));
const send = require("./send_email");

const pending_approval = (request, response) => {
  //   console.log(request, response);
  const query = "SELECT * FROM userInfo where pendingApproval='1';";
  connection.query(query, (error, results, fields) => {
    let arr = [];
    // console.log(results);
    results.forEach((element) => {
      arr.push(element);
    });

    // console.log("obj", obj);
    response.render("pending_approval", { arr: arr });
  });
};

const approve = (req, res) => {
  let query_new = "UPDATE userInfo SET pendingApproval='0' WHERE userId=?;";
  connection.query(query_new, [req.params.id], (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      var email = req.params.email;
      var token = email;
      var subject =
        "Voter Profile request approved, Set username and password - votingsystem";
      var message =
        '<p> Click <a href = "http://localhost:3000/set_credentials/' +
        token +
        '">here</a> to set your username and password. </p>';
      var sent = send.sendEmail(email, token, subject, message);
      pending_approval(req, res);
    }
  });
};

const decline = (req, res) => {
  let query_new = "DELETE FROM userInfo WHERE userId=?";
  connection.query(query_new, [req.params.id], (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      var email = req.params.email;
      var token = randtoken.generate(20);
      var subject = "Voter Profile request declined - votingsystem";
      var message =
        "<p> Unfortunately, after further inspection of your voter profile, your request has been declined by our Manager/Admin.  </p>";
      var sent = send.sendEmail(email, token, subject, message);
      pending_approval(req, res);
    }
  });
};

let obj2 = {
  pending_approval: pending_approval,
  approve: approve,
  decline: decline,
};
module.exports = obj2;
