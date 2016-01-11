var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../index');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'friends_schema'
});

connection.connect(function(err){
    if(err){
        console.log('No connection to mysql server' + err.message);
    }else{
        console.log('Connected to mysql server: database friends_schema');
    }
});

exports.loginMysql=function(req,res){
    connection.query('SELECT * from user where username=? and pass=?',[req.body.username,req.body.password],function(error,results,fields){
        console.log(error);
        console.log(results);
        console.log(fields);
    });
}

exports.loginMysqlProc = function(req,res){
    connection.query('CALL getLoginInfo(?,?)',[req.body.username,req.body.password],function(error,results,fields){
        if(error){
            res.send(502,{status:error.message});
        }else{
            if(results.length > 0){
                req.session.kayttaja = results.username;
                var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
                res.send(200,{status:"Ok",secret:token});
            }
            else{
                res.send(401,{status:"wrong username or password"});
            }
        }
    });
}