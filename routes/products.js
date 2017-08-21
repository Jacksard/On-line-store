var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var multer = require('multer');
var upload = multer({ dest: 'public/img/uploads' });
var fs = require('fs');
var collections = ['products', 'categories', 'mycart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);
var ObjectId = mongojs.ObjectId;


router.post('/', upload.single('image'), function(req, res, next){
    
     if(req.file){
        var imageId = req.file.filename;
        var productimage = 'true';
        console.log(productimage);
        console.log(imageId);
    } else {
        productimage = 'false';
    }

    var newProduct = {};
    newProduct.product_name = req.body.product_name;
    newProduct.price = req.body.price;
    newProduct.category = req.body.category;
    newProduct.in_stock = req.body.in_stock;
    newProduct.desc = req.body.desc;
    newProduct.image = productimage;
    
    
    console.log(newProduct);
     
    if (newProduct.image === 'true'){

       
        var dir = './public/img/'+newProduct.category;

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }
    
    fs.rename('./public/img/uploads/'+imageId, './public/img/'+ newProduct.category + '/' + newProduct.product_name +'.jpg'), function(err){
        if (err) throw err;
        console.log('renname Complete!');
    }
    } else {
        console.log('no picture uploaded');
    }

    db.products.save(newProduct, function(err, docs){
            res.status(301).redirect('/')
            })
});


router.delete('/delete/:id', function(req, res){
    db.products.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if (err){
            console.log(err);

        }
        res.redirect('/');
    })
});













module.exports = router;