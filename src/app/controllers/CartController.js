const res = require("express/lib/response");
const Cart = require('../models/cart');
const Coupon = require("../models/coupon");

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

    async addProductToCart(req, res) {
        const { username, listCartabc } = req.body;
        const newCart = await Cart.create({ username: username, listProduct: listCartabc })
        newCart.save()
            .then(result => {
                res.status(201).json({ message: "Khởi tạo thành công" })
            })
            .catch(err => {
                res.status(404).send(err);
            })
    }

    async getCartUser(req, res) {
        const { username } = req.body;
        Cart.findOne({ username: username })
            .then(result => {
                if (result) {
                    res.send(
                        JSON.stringify({
                            status: 201,
                            cart: result,
                        })
                    );
                }
            })
    }

    async getCoupon(req, res) {
        const { couponCode } = req.body
        Coupon.findOne({couponCode}).then(result => {
            if(result) {
                res.send(
                    JSON.stringify({
                        status: 201,
                        Coupon: result,
                    })
                )
            } else {
                res.status(403).send(
                    JSON.stringify({
                        status: 403,
                        message: "Mã giảm giá không tồn tại",
                    })
                )
            }
        })
    }
}

module.exports = new CartController;