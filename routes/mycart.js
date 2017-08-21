var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories', 'mycart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);
var ObjectId = mongojs.ObjectId;

router.get('/', function(req, res, next){
    
    db.mycart.find(function(err, products){

        var total = 0;
        var sum = 0;
        products.forEach(function(price) {
            console.log(price.price);
            sum += price.price;
            console.log(sum);
            total = sum.toFixed(2);
            console.log(total);
        });
        
        

        
        res.render('mycart', { 
            title : 'My Shopping cart:',
            products: products,
            amount_incart: products.length,
            total
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