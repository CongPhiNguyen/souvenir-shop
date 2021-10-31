const res = require("express/lib/response");

class CartController {
    // [GET] /home
    index(req, res){
        const active = {
            type: 'cart',
        }
        res.render('cart', {active});
    }
}

module.exports = new CartController;