const res = require("express/lib/response");

class ProductController {
    // [GET] /home
    index(req, res){
        const active = {
            type: 'product',
        }
        res.render('product', {active});
    }
}

module.exports = new ProductController;