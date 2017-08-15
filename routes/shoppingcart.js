var express = require('express');
var router = express.Router();

router.get('/shoppingcart', function(req, res, next){
    res.render('shoppingcart.ejs');
});

module.exports = router;