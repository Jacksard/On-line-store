var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories', 'shoppingcart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);

// Get All products //Multiple Collections

router.get('/products/:category', function(req, res){

    var type = req.params.category;

    console.log(type);
    db.products.find(function(err, products){
        if(err){
        res.send(err);
        }
            
    db.categories.find(function(err, categories){
        if(err){
        res.send(err);
        } else {
        res.render('products', { 
            title : 'Main Page',
            products : products,
            categories : categories,
            type

             });
        };
        });
    });
});    

router.get('/', function(req, res, next){

    var type = 'All Products';
    
    db.products.find(function(err, products){
        if(err){
        res.send(err);
        }
        
    
    db.categories.find(function(err, categories){
        if(err){
        res.send(err);
        } else {
        res.render('index', { 
            title : 'Main Page',
            products : products,
            categories : categories,
            type
            });
        };
        });
    });
});






module.exports = router;