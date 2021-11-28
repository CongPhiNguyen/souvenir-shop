const res = require("express/lib/response");

class ProductController {
    // [GET] /home
    index(req, res){
        res.render('product', { title: "Product" , active: {Product: true }});
    }

    
}

module.exports = new ProductController;