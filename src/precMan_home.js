const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
var router = express.Router();

 const app = express();
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, 'static')));

  // http://localhost:3000/
   app.get('/precMan_home', function(request, response) {
   // Render login template
   response.sendFile(path.join(__dirname + '/precMan_home.html'));
});

