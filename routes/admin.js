var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories', 'mycart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);


router.get('/', function(req, res, next){
    
        var type = 'All Products';
    
        db.mycart.find(function(err, amount){
            if(err){
            res.send(err);
            }
                
        db.products.find(function(err, products){
            if(err){
            res.send(err);
            } 
    
        db.categories.find(function(err, categories){
            if(err){
            res.send(err);
            } else {
            
            res.render('admin', { 
                title : 'Main Page',
                products : products,
                categories : categories,
                amount: amount.length,
                type
                
                });
            };
            });
        });
        });
    
    });

    module.exports = router;