var express = require('express');
var mongojs = require('mongojs');
var multer = require('multer');
var upload = multer({ dest: 'public/img/uploads' });
var fs = require('fs');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var router = express.Router();
var collections = ['products', 'categories', 'mycart']
var db = mongojs('mongodb://jacob:jacob@ds129043.mlab.com:29043/online-store-products', collections);
var ObjectId = mongojs.ObjectId;

router.use(expressValidator());

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
                title : 'Admin Page',
                products : products,
                categories : categories,
                amount: amount.length,
                errors:'null',
                type
                
                });
            };
        });
    });
});
});

// Save a new Product
router.post('/add', upload.single('image'), function(req, res, next){
    
     if(req.file){
        var imageId = req.file.filename;
        var productimage = 'true';
        console.log(productimage);
        console.log(imageId);
    } else {
        productimage = 'false';
    }

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
          
            };

    var newProduct = {};
    newProduct.product_name = req.body.product_name;
    newProduct.price = Number(req.body.price);
    newProduct.category = req.body.category;
    newProduct.in_stock = req.body.in_stock;
    newProduct.desc = req.body.desc;
    newProduct.image = productimage;



    // Validation
	req.checkBody('product_name', 'Product name is required').notEmpty();
    req.checkBody('price' , 'Price is required').notEmpty();
    req.checkBody('price' , 'Price must be a Number').isNumeric();
    req.checkBody('price' , 'Price must be a positive Number').isCurrency({allow_negatives: false});
	req.checkBody('desc', 'Description is required').notEmpty();
	

	var errors = req.validationErrors();

    if(errors){
        console.log(errors);
        console.log('Errors were shoot to front!');
        
        res.render('admin', {
            title : 'Admin Page',
            errors:errors,
            products : products,
            categories : categories,
            amount: amount.length,
            type
        });
        
    } else {
               
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
               res.status(301).redirect('/admin')
               })
   }
});

});
});
});


router.get('/:id', function(req, res, next){
    var proId = req.params.category;

    

    db.categories.find(function(err, categories){
        if(err){
        res.send(err);
        }

    var productId = req.params.id;
    console.log(productId);

    db.products.findOne({_id: mongojs.ObjectId(productId)}, function(err, doc) {
        console.log(doc);
        res.render('partials/editproduct', {
            title : 'Edit Page',
            categories : categories,
            doc
            
        });
    });
 
});
});

// EDIT PRODUCT
router.post('/edit/:id', upload.single('image'), function(req, res, next){

    var productId = req.params.id;
    console.log(productId);
   

     if(req.file){
        var imageId = req.file.filename;
        var productimage = 'true';
        console.log(productimage);
        console.log(imageId);
    } else {
        productimage = 'false';
    }

    var editProduct = {};
    editProduct.product_name = req.body.product_name;
    editProduct.price = Number(req.body.price);
    editProduct.category = req.body.category;
    editProduct.in_stock = req.body.in_stock;
    editProduct.desc = req.body.desc;
    editProduct.image = productimage;
    
    console.log("editProduct");
    console.log(editProduct);
     
    if (editProduct.image === 'true'){
        var dir = './public/img/'+editProduct.category;
        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }
    
    fs.rename('./public/img/uploads/'+imageId, './public/img/'+ editProduct.category + '/' + editProduct.product_name +'.jpg'), function(err){
        if (err) throw err;
        console.log('renname Complete!');
    }
    } else {
        console.log('no picture uploaded');
    }

    // Using Doc to target product_name for the update, cant target Id for some reason.
    db.products.findOne({_id: mongojs.ObjectId(productId)}, function(err, doc){
        if(err){
            res.send(err);
            }
     console.log(doc.product_name);
    
    db.products.update({"product_name": doc.product_name},{
       $set: {
               "product_name": editProduct.product_name,
               "price": editProduct.price,
               "category": editProduct.category,
               "desc": editProduct.desc
             }
       },{
         insert:false,
         multi : true
       })
       
});
});

module.exports = router;


