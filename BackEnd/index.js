var express = require("express");
var path = require("path");
var https = require('https');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var user =require('./modules/user');

var options = {
    key:fs.readFileSync('server.key'),
    cert:fs.readFileSync('server.crt'),
    requestCert:false,
    rejectUnauthorized:false
}

var uuid = require('uuid');

var secret = uuid.v1();

exports.secret = secret;

var session = require('express-session');

var app = express();

app.set('port',process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");


// ************** middlewares 
app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:600000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Define middlewares for static files (.html,.css,.js files that are 
//loaded by browser when parsing index.html -file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));

app.use('/friends',user);

// *********** routers
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});
app.get("/persons",function(req,res){
    queries.getAllPersons(req,res);
});
app.get('/isLogged',function(req,res){
    if(req.session.kayttaja){
        res.status(200).send([{status:'Ok'}]);
    }
    else{
        res.status(401).send([{status:'Unauthorized'}]);
    }
});



app.use(function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,secret, function(err,decoded){
            if(err){
                return res.send(401);
            }else {
                req.decoded = decoded;
                console.log(req.decoded);
                next();
            }
        });
    }else{
        res.send(403);
    }
 
});

//----------------------------- rest api middlewares --------------------------//
app.use('/persons',person);




https.createServer(options,app).listen(app.get('port'), app.get('ip'), function()
{
    console.log("express server started");
});
