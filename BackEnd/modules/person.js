var express = require("express");
var db = require('./queries');
var router = express.Router();

router.get('/',function(req,res){
    db.getAllPersons(req,res);
});

router.get('/:nimi',function(req,res){
    db.searchPerson(req,res);
});
router.post('/',function(req,res){
    db.saveNewPerson(req,res);
});
router.put('/',function(req,res){
    db.updatePerson(req,res);    
});
router.delete('/:id/:username',function(req,res){
    console.log("DB delete");
    db.deletePerson(req,res);
});

module.exports = router;