const res = require("express/lib/response");

class CartController {
    // [GET] /home
    async getCart(req, res) {
        const active = {
            type: 'cart',
        }
        res.render('cart', { active });
    }

    async getReturnPolicy(req, res) {
        try {
            res.render('cart/returnPolicy')
        }
        catch {
            
        }
    }

    async raiseQuantity(req, res) {
        try {
            console.log(req.body.slug)
            const data = {
                ten: 'luong thien',
                tuoi: 'hello',
            }
            res.status(200).json(data)
        }
        catch {
        }
    }

    async deleteProductFromCart(req, res) {
        try {

            console.log(req.body.name)
            res.redirect('/cart')
        }
        catch {

        }
    }
}

module.exports = new CartController;