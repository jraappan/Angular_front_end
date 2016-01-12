// This file is a router for the user resource
var query = require('./queries');
var mysql =require('./mysql_module');

var express = require("express");

var router = express.Router();

router.get('/',function(req,res){
    //query.getFriendsByUsername(req,res);
    mysql.getFriendsForUserByUsername(req,res);
});

router.post('/login',function(req,res){
    //query.loginFriend(req,res);
    mysql.loginMysqlProc(req,res);
});
router.post('/register',function(req,res){
    //query.registerFriend(req,res);
    console.log("register");
    mysql.registerUser(req,res);
});
module.exports = router;