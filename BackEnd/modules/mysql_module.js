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
            var test = results[0];
            if(test.length > 0){       
                req.session.kayttaja = test[0].username;
                req.session.user_id = test[0].user_id;
                var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
                res.send(200,{status:"Ok",secret:token});
            }
            else{
                res.send(401,{status:"wrong username or password"});
            }
        }
    });
}

exports.getFriendsForUserByUsername = function(req,res){
    connection.query('CALL getFriendsByUser(?)', [req.session.kayttaja],function(error,results,fields){
        if(results.length > 0){
            var data = results[0];
            res.send(data);
        }else{
            res.redirect('/');
        }
        
        //console.log(results);
    });
}
exports.registerUser = function(req,res){
    connection.query('CALL registerUser(?,?)', [req.body.username,req.body.password],function(error,results,fields){
        console.log(error);
        console.log(results);
        console.log(fields);
        if(error){
            res.status(500).send({status:"register failed - username already in use"});
        }
        else{
            res.status(200).send({status:"Register ok"});
        }
    });
}

exports.addFriend = function(req,res){
    connection.query('CALL addFriend(?,?,?,?)', [req.body.name,req.body.address,req.body.age,req.session.user_id],function(error,results,fields){
        if(error){
                res.status(500).json({message:'Fail'});
            }else{
                
                res.status(200).json({data:results});
            }
    });
}
exports.updateFriend = function(req,res){
    connection.query('CALL updateFriend(?,?,?,?)', [req.body.name,req.body.address,req.body.age,req.body.id],function(error,results,fields){
        if(error){
                res.status(500).json({message:'Fail to updated'});
            }else{
                
                res.status(200).json({data:results});
            }
    });
}