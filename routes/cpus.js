var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'shoppingcart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);

console.log('cpus.js loaded!');

var type = 'cpus';

router.get('/', function(req, res, next){
    db.products.find(function(err, products){
        if(err){
            res.send(err);
        }
        res.render('cpus', {
            title: 'Cpus',
            products : products,
            type
        });
        console.log(products);
})
});

module.exports = router;