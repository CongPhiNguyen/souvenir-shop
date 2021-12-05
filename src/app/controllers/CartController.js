const res = require("express/lib/response");
const Cart = require('../models/cart');
const Coupon = require("../models/coupon");
const Receipt = require('../models/receipt')

class CartController {
    // [GET] /home
    async getCart(req, res) {
        const active = {
            type: 'cart',
            Cart: true,
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

    async updateCartUser(req, res) {
        try {
            const { username, listProduct } = req.body
            Cart.findOneAndUpdate({
                'username': username
            },
                {
                    $set: {
                        listProduct: listProduct
                    }
                },
                { returnOriginal: false }).exec()
                .then(result => {
                    res.status(200).json("Update success!");
                })
                .catch(err => {
                    res.status(401).json("Update failed!");
                })
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
        let username = 'lngthinphc@gmail.com';
        let listCartabc = [
            {
                product: {
                    productID: '1',
                    name: 'iphone 1 promax',
                    location: 'Hawai',
                    province: 'An Giang',
                    quantity: '20',
                    remain: '20',
                    originalPrice: 20000,
                    sellPrice: 30000,
                    currentPrice: 25000,
                    imgUrl: 'https://res.cloudinary.com/databaseimg/image/upload/v1637735182/f8dxrubo9icgb5o5iyf2.jpg',
                    description: 'Đây là sản phẩm mới nhất của apple. Không thể tin được, thật không thể tin được là apple lại nhảy từ 13 về 1',
                    unit: 'phone',
                    rating: 4.3
                },
                quantity: 2
            },
            {
                product: {
                    productID: '2',
                    name: 'Quar cau tuyet',
                    location: 'Ha tien',
                    province: 'An Giang',
                    quantity: '20',
                    remain: '10',
                    originalPrice: 50000,
                    sellPrice: 70000,
                    currentPrice: 65000,
                    imgUrl: 'https://res.cloudinary.com/databaseimg/image/upload/v1637735182/f8dxrubo9icgb5o5iyf2.jpg',
                    description: 'Đây là sản phẩm mới nhất của apple. Không thể tin được, thật không thể tin được là apple lại nhảy từ 13 về 1',
                    unit: 'phone',
                    rating: 4.2
                },
                quantity: 3
            },
            {
                product: {
                    productID: '3',
                    name: 'iphone 13 promax',
                    location: 'Hawai',
                    province: 'An Giang',
                    quantity: '20',
                    remain: '10',
                    originalPrice: 10000,
                    sellPrice: 130000,
                    currentPrice: 125000,
                    imgUrl: 'https://res.cloudinary.com/databaseimg/image/upload/v1637735182/f8dxrubo9icgb5o5iyf2.jpg',
                    description: 'Đây là sản phẩm mới nhất của apple. Không thể tin được, thật không thể tin được là apple lại nhảy từ 13 về 1',
                    unit: 'phone',
                    rating: 4.3
                },
                quantity: 1
            },
        ]
        const newCart = await Cart.create({ username: username, listProduct: listCartabc })
        newCart.save()
            .then(result => {
                res.status(201).redirect('cart')
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
                    res.status(201).send(
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
        Coupon.findOne({ couponCode }).then(result => {
            if (result) {
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

    async createReceipt(req, res) {
        const { recieptId, name, phone, username, address, note, province, district, paymentMethod, listProduct, total, totalFinal, deliveryMoney, coupon, deliveryStatus } = req.body;
        const newReceipt = await Receipt.create({ recieptId, name, phone, username, address, note, province, district, paymentMethod, listProduct, total, totalFinal, deliveryMoney, coupon, deliveryStatus })
        newReceipt.save()
            .then(result => {
                if (result) {
                    Cart.findOneAndUpdate({
                        'username': username
                    },
                        {
                            $set: {
                                listProduct: []
                            }
                        },
                        { returnOriginal: false }).exec()
                    if (coupon) {
                        Coupon.findOneAndUpdate(
                            { 'couponCode': req.body.coupon.couponCode },
                            {
                                $set: {
                                    isUsed: true
                                }
                            },
                            { returnOriginal: false }).exec()

                    }
                    res.status(201).send(
                        JSON.stringify({
                            message: "Đặt hàng thành công!",
                            status: 201,
                            cart: result,
                        })
                    );
                } else {
                    res.status(403).send(
                        JSON.stringify({
                            status: 403,
                            message: "Đặt hàng thất bại",
                        })
                    )
                }
            })
    }
}

module.exports = new CartController;