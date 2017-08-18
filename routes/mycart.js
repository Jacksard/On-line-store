var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var collections = ['products', 'categories', 'shoppingcart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);
var ObjectId = mongojs.ObjectId;


router.get('/:id', function(req, res, next){
    var productId = req.params.id;
    console.log(productId);

    db.products.findOne({_id: mongojs.ObjectId(productId)}, function(err, doc) {
	console.log(doc);
})

    res.render('mycart.ejs');
});

module.exports = router;