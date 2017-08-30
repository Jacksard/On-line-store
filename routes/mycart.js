var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories', 'mycart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);
var ObjectId = mongojs.ObjectId;

router.get('/', function(req, res, next){
    
    db.mycart.find(function(err, products){
        
        // Shows 2 decimels after teh point
        var total = 0;
        var sum = 0;
        products.forEach(function(price) {
            console.log(price.price);
            sum += price.price;
            
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

// Grabing the product by its Id and adding to mu cart.

router.get('/:id', function(req, res, next){
    var productId = req.params.id;
    console.log(productId);
    db.products.findOne({_id: mongojs.ObjectId(productId)}, function(err, doc) {
    console.log(doc);

    /*pushing the doc into an new object.
    to make it possible to add the same product more than once, 
    else the product is saved with the same id, new object creates new id. */

    newP = {};
    newP.product_name = doc.product_name;
    newP.price = Number(doc.price);
    newP.category = doc.category;
    newP.in_stock = doc.in_stock;
    newP.desc = doc.desc;
    
    db.mycart.save(newP, function(err, docs){
            res.status(301).redirect('/')
            });

    });

});

// Remove the product from mycart

router.get('/remove/:id', function(req, res, next){
    var removeId = req.params.id;
    console.log(removeId);

    db.mycart.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if (err){
            console.log(err);
        }
        res.redirect('/mycart');
    });
});


module.exports = router;