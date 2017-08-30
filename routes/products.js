var express = require('express');
var mongojs = require('mongojs');
var multer = require('multer');
var expressValidator = require('express-validator');
var router = express.Router();
var upload = multer({ dest: 'public/img/uploads' });
var fs = require('fs');
var bodyParser = require('body-parser');
var collections = ['products', 'categories', 'mycart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);
var ObjectId = mongojs.ObjectId;

router.use(expressValidator());




router.delete('/delete/:id', function(req, res){
    db.products.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if (err){
            console.log(err);

        } else {
        res.redirect('/admin');
        };
    })
});


module.exports = router;