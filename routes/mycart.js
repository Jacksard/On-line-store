var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories', 'mycart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);
var ObjectId = mongojs.ObjectId;

router.get('/', function(req, res, next){
    
    db.mycart.find(function(err, products){
   
        res.render('mycart', { 
            title : 'My Shopping cart:',
            products: products,
            amount_incart: products.length
        });       
});
});

router.get('/:id', function(req, res, next){
    var productId = req.params.id;
    console.log(productId);
    db.products.findOne({_id: mongojs.ObjectId(productId)}, function(err, doc) {
    console.log(doc);
    
    db.mycart.save(doc, function(err, docs){
            res.status(301).redirect('/')
            });

    });

});






module.exports = router;