const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");
var router = express.Router();
var bodyParser = require("body-parser");
var connection = require("./database_connection");
const verifyEmail = require("./reset_password");
const login = require("./login");
const updatePassword = require("./update_password");
const createElection = require("./create_election");
const flash = require("connect-flash");
const createPrecinct = require("./create_precinct");
const search = require("./search_user_db");
const multer = require("multer");
const obj2 = require("./pending_approval");
const setCredentials = require("./set_credentials");

const app = express();
app.set("view engine", "ejs");
//app.set("view engine","jade")
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "upload")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
var uploadMultiple = upload.fields([
  { name: "drivinglicense", maxCount: 1 },
  { name: "passport", maxCount: 1 },
]);

// http://localhost:3000/
app.get("/", function (request, response) {
  // Render login template
  response.render("login");
});

app.post("/login", function (request, response) {
  login(request, response);
});

///////////////// HOME PAGES ///////////////////////
app.get("/admin_home", function (request, response) {
  response.sendFile(path.join(__dirname + "/admin_home.html"));
});

app.post("/admin_home", function (request, response) {
  response.redirect("/admin_home");
});
app.get("/voter_home", function (request, response) {
  response.sendFile(path.join(__dirname + "/voter_home.html"));
});

app.post("/voter_home", function (request, response) {
  response.redirect("/voter_home");
});

app.get("/precMan_home", function (request, response) {
  response.sendFile(path.join(__dirname + "/precMan_home.html"));
});

app.post("/precMan_home", function (request, response) {
  response.redirect("/precMan_home");
});

////////////////// RESET PASSWORD /////////////////
app.get("/reset_password", function (request, response) {
  response.sendFile(path.join(__dirname + "/reset_password.html"));
});

app.post("/reset_password", function (request, response) {
  response.redirect("/reset_password");
});

app.post("/verify_email", function (request, response) {
  verifyEmail(request, response);
});

app.post("/update-password", function (request, response) {
  updatePassword(request, response);
});

app.get("/update_password", function (request, response) {
  response.sendFile(path.join(__dirname + "/update_password.html"));
});

/////////////////// REGISTER /////////////////////////
app.get("/registration", function (request, response) {
  response.render("registration", { userId: "", error_msg: "" });
});

app.post("/registerUser", uploadMultiple, function (request, response) {
  const request_body = JSON.parse(JSON.stringify(request.body));
  const request_files = JSON.parse(JSON.stringify(request.files));

  let name = request_body.name;
  let age = request_body.age;
  let address = request_body.address;
  let zipcode = request_body.zip;
  let drivingLicense = request_files.drivinglicense[0].filename;
  let passportNo = request_files.passport[0].filename;
  let emailId = request_body.email;
  let userType = request_body.role;
  let error_msg;
  let userId;

  if (!request_files || Object.keys(request_files).length === 0) {
    return response.status(400).send("No files were uploaded.");
  }
  let query1 =
    "INSERT INTO userInfo (name,age,address,zipcode,drivingLicense,passportNo ,emailId,userType,failedLoginAttempts,pendingApproval) VALUES (?, ?,?,?,?,?,?,?,0,1);";
  connection.query(
    query1,
    [
      name,
      age,
      address,
      zipcode,
      drivingLicense,
      passportNo,
      emailId,
      userType,
    ],
    (error, results, fields) => {
      if (error) {
        if (error.code == "ER_DUP_ENTRY") {
          error_msg =
            "Passport and drivers license must be unique to each user.";
          response.render("registration", { error_msg: error_msg, userId: "" });
        }
        console.log(error);
      } else {
        connection.query(
          "SELECT userId FROM userInfo ORDER BY userId DESC limit 1;",
          (error, results, fields) => {
            if (error) {
              console.log(error);
              response.render("registration", {
                userId: "",
                error_msg: error,
              });
            } else {
              userId = results[0].userId;
              console.log(userId);
              response.render("registration", {
                userId: userId,
                error_msg: "",
              });
            }
          }
        );
      }
    }
  );
});

////////////////// CREATE ELECTION //////////////////////////
app.post('/create-election', function(request, response){
	let results = createElection(request,response);
	let election_id = results[0];
	let candidate_list_id = results[1];
	//let precinct_list_id = results[2];
	response.redirect(`/view_election/${election_id}`); //${candidate_list_id}/${precinct_list_id}`);
});

app.post('/create_election', function(request, response){
	response.redirect('/create_election');
});

app.get('/create_election', function(request, response) {
	response.sendFile(path.join(__dirname + '/create_election.html'));
});

//////////////////// SUMMARY OF ELECTION INFO. //////////////////////
app.get('/view_election/:election_id', function(request, response) {
	
	connection.query('(SELECT * FROM electionInfo where election_id = ?)', [request.params.election_id],function (err, rows) {
        if(err){ 
			response.render('view_election',{page_title:"View Election",electionData:''});   
		}
		else{
			   
			response.render('view_election',{page_title:"View Election",electionData:rows});
		}
							   
	});

});

app.post('view_election/view', function(request, response){
	response.render('/admin_home');
});

/////////////////// TABLE OF ELECTIONS //////////////////////////
app.get("/elections", function (req, res, next) {
  var sql = "SELECT election_id, title FROM electionInfo";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("elections", { title: "Elections", data: rows });
  });
});

//////////// LINK TO SUMMARY ///////////
app.post("/view_page", function (request, response) {
  // elections.ejs FORM ACTION
  response.redirect(`/view_election/${election_id}`);
});

////////////////////// SEARCH /////////////////////////////////
app.post("/search", function (request, response) {
  search(request, response);
  //response.redirect(`/search_user_db`);
});

app.post("/search_user_db", function (request, response) {
  response.redirect("/search_user_db");
});

app.get("/search", function (request, response) {
  response.render("search_user_db");
});

/////////////////// CREATE PRECINCT //////////////////////////
app.post("/create-precinct", function (request, response) {
  createPrecinct(request, response);
  response.redirect(`/precincts`);
});

app.post("/create_precinct", function (request, response) {
  response.redirect("/create_precinct");
});

app.get("/create_precinct", function (request, response) {
  response.sendFile(path.join(__dirname + "/create_precinct.html"));
});

/////////////////// TABLE OF PRECINCTS ///////////////////////
app.get("/precincts", function (req, res, next) {
  var sql = "SELECT * FROM precincts";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render("precincts", { title: "Precincts", data: rows });
  });
});

app.post("/precincts", function (request, response) {
  response.render("/precincts");
});

/////////////////// PENDING APPROVALS ///////////////////////

app.get("/pending_approval", (req, res, next) => {
  obj2.pending_approval(req, res);
});

app.post("/approval/:id/:email", (req, res, next) => {
  console.log(req.params.id);
  obj2.approve(req, res);
});

app.post("/decline/:id/:email", (req, res, next) => {
  console.log(req.params.id);
  obj2.decline(req, res);
});

/////////////////// SET CREDENTIALS ///////////////////////

app.get("/set_credentials/:email", (req, res, next) => {
  res.render("set_credentials", { email: req.params.email, message: "" });
});

app.post("/setCredentials", (req, res, next) => {
  console.log(req.body);
  setCredentials(req, res);
});

app.listen(3000);
