var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var expressValidator = require('express-validator');
var multer = require('multer');
var upload = multer({ dest: 'public/img/uploads' });



var index = require('./routes/index');
var products = require('./routes/products');
var shoppingcart = require('./routes/shoppingcart');
var phones = require('./routes/phones');
var gadgets = require('./routes/gadgets');
var cpus = require('./routes/cpus');
var books = require('./routes/books');
var gpus = require('./routes/gpus');
var categories = require('./routes/categories');




var app = express();


// View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/products', products);
app.use('/products/phones', phones);
app.use('/products/gadgets', gadgets);
app.use('/products/cpus', cpus);
app.use('/products/books', books);
app.use('/products/gpus', gpus);
app.use('/categories', categories);





// Set Static path
app.use(express.static(path.join(__dirname,'public')))

// Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
})

// Express-Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



/*app.post('/products/add', function(req, res){

    req.checkBody('product_name', 'Product Name is required').notEmpty;
    req.checkBody('price', 'Price is required').notEmpty;
   

    var errors = req.getValidationResult()
    

    if (errors) {
        res.render('index', {
            title: 'products will be shown here',
            products: products,
            errors: errors
        });
    } else {
        var newProduct = {
            product_name: req.body.product_name,
            price: req.body.price,
            category: req.body.category,
            in_stock: req.body.in_stock
    }
    console.log('Success!');    
}
    
})
*/

app.listen(3000, function(){
    console.log('Server started on port 3000..');
})