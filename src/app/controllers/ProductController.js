const res = require("express/lib/response");

class ProductController {
    // [GET] /home
    index(req, res){
        res.render('product');
    }
}

module.exports = new ProductController;