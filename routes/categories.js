var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);

console.log('categories.js loaded!');

router.post('/', function (req, res, next){

    var catName = req.body.newcagetory;
    var newCategory = {};
    
    function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Capitalize first letter
    newCategory.name = capitalize(catName);

    console.log(newCategory.name);

    db.categories.save(newCategory, function(err, docs){
            res.status(301).redirect('/');
            });
 
    
        
});


//newCategory.name = req.body.newcagetory;
 //   console.log(newCategory.name);




module.exports = router;

