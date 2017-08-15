var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);

console.log('categories.js loaded!');

router.post('/', function (req, res, next){
    var newCategory = {};
    newCategory.name = req.body.newcagetory;
    console.log(newCategory.name);

    
    db.categories.save(newCategory, function(err, docs){
            res.status(301).redirect('/');
            });
 
    
        
});







module.exports = router;