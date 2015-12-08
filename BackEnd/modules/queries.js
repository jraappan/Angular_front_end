var db = require('./database');
// this function gets all documents from person collection
exports.getAllPersons = function(req,res){
    
    db.Person.find(function(err,data){
        
        if(err){
            console.log(err.message);
            res.send("Error in database");
        }
        else{
            res.send(data);
        }
    });
}

exports.saveNewPerson = function(req,res){
    
    var personTemp = new db.Person(req.body);
    personTemp.save(function(err,ok){
        db.Friends.update({username:req.body.user},
                         {$push:{'friends':personTemp._id}},
                         function(err,model){
            
           //res.redirect('/persons.html');
            res.send("Person added");
        });

    });
}

exports.deletePerson = function(req,res){
    var id = req.params.id.split("=")[1];
    var user = req.params.username.split("=")[1];
    console.log(user);
//    user = user.split("=")[1];
    console.log("Person id")
    console.log(id);
    console.log("user*****");
    console.log(user);

    db.Person.remove({_id:id},function(err){
        if(err){
            res.send(err.message);
        }
        else{
            db.Friends.update({username:user},
            {$pull:{'friends':id}},function(err,data){
                if(err){
                    console.log(err.message);
                }else{
                    console.log("Id removed from array");
                }
            });
            res.send("Delete ok");
        }
    });
}

exports.updatePerson = function(req,res){
    
    var updateData = {
        name:req.body.name,
        address:req.body.address,
        age:req.body.age
    }
    db.Person.update({_id:req.body.id},updateData,function(err){
        res.send({data:"ok"}); // hox! return dataType json
    });
}
// search person by nane or by begin letters of name
exports.searchPerson = function(req,res){
    var name = req.params.nimi.split("=")[1];
    console.log("name:" + name);
    db.Person.find({name:{'$regex':'^' + name,'$options':'i'}},function(err,data){
        
        if(err){
            console.log(err.message);
            res.send("Error in database search");
        }
        else{
            res.send(data);
        }
    });
}

exports.registerFriend = function(req,res){
    var friend = new db.Friends(req.body);
    friend.save(function(err){
        if(err){
            res.status(500).send({status:"register failed - username already in use"});
        }
        else{
            res.status(200).send({status:"Register ok"});
        }
    });
}

exports.loginFriend = function(req,res){
    var searchObject = {
        username:req.body.username,
        password:req.body.password
    }
    console.log('uusi post');
        console.log(req.body.password);
    db.Friends.findOne(searchObject,function(err,data){
        if(err){
            res.send(502,{status:err.message});
        }else{
            if(data){
                req.session.kayttaja = data.username;
                console.log('req.session.kayttaja - login tapahtuma:');
        console.log(req.session.kayttaja);
                res.send(200,{status:"Ok"});
            }else{
                res.send(401,{status:"Wrong username or password"});
            }
        }
    });
}
exports.getFriendsByUsername = function(req,res){
    //var usern = req.params.username.split("=")[1];
    db.Friends.findOne({username:req.session.kayttaja}).
    populate('friends').exec(function(err,data){
        console.log('req.session.kayttaja:');
        console.log(req.session.kayttaja);
        //console.log(data.friends);
        res.send(data.friends);
    });
}