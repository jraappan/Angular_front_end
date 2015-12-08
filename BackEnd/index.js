var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var user =require('./modules/user');

var uuid = require('uuid');
var session = require('express-session');

var app = express();

// ************** middlewares 
app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:600000}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(req.body);
    console.log(req.session);
    // console.log(database.Person);
    // send request forward in stack
    next();
});
// Define middlewares for static files (.html,.css,.js files that are 
//loaded by browser when parsing index.html -file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));
//----------------------------- rest api middlewares --------------------------//
app.use('/persons',person);
app.use('/friends',user);


// *********** routers
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});
app.get("/persons",function(req,res){
    queries.getAllPersons(req,res);
});


app.listen(3000);