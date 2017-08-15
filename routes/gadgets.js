var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'shoppingcart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);

console.log('gadgets.js loaded!');

var type = 'gadgets';

router.get('/', function(req, res, next){
    db.products.find(function(err, products){
        if(err){
            res.send(err);
        }
        res.render('gadgets', {
            title: 'Gadgets are here',
            products : products,
            type
        });
        console.log(products);
})
});

module.exports = router;