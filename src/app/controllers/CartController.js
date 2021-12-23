const res = require("express/lib/response");
const Cart = require('../models/cart');
const Coupon = require("../models/coupon");
const Receipt = require('../models/receipt')
const Voucher = require('../models/voucher')

class CartController {
    // [GET] /home
    async getCart(req, res) {
        console.log(req.session.user);
        const active = {
            type: 'cart',
            Cart: true,
        }
        res.render('cart', { active, user: req.session.user });
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
            const { userCode, listProduct} = req.body

            Cart.findOneAndUpdate({
                userCode
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
        let userCode = '675472127';
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
        const newCart = await Cart.create({ userCode: userCode, listProduct: listCartabc })
        newCart.save()
            .then(result => {
                res.status(201).redirect('cart')
            })
            .catch(err => {
                res.status(404).send(err);
            })
    }

    async getCartUser(req, res) {
        const { userCode } = req.body;
        Cart.findOne({ userCode })
            .then(result => {
                if (result) {
                    res.status(201).send(
                        JSON.stringify({
                            status: 201,
                            cart: result,
                        })
                    );
                }
                else {
                    res.status(200).send(
                        JSON.stringify({
                            status: 200,
                            cart: [],
                        })
                    )
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
        let { receiptId, name, phone, userCode, mail, address, note, province, district, paymentMethod, listProduct, total, totalFinal, deliveryMoney, discount, coupon, deliveryStatus } = req.body;
        if(coupon) {
            var voucherList = await Voucher.findOne({ voucherId: coupon.voucherId }).exec()
        }
        const newReceipt = await Receipt.create({ receiptId, name, phone, userCode, mail, address, note, province, district, paymentMethod, listProduct, total, totalFinal, deliveryMoney, discount, coupon, deliveryStatus })
        newReceipt.save()
            .then(result => {
                if (result) {
                    Cart.findOneAndUpdate({
                        'userCode': userCode
                    },
                        {
                            $set: {
                                listProduct: []
                            }
                        },
                        { returnOriginal: false }).exec()
                    if (coupon) {
                        let codeList = voucherList.codeList
                        codeList.map(value => {
                            if (value.code == coupon.code) {
                                value.isUsed = true
                            }
                        })
                        Voucher.findOneAndUpdate(
                            { 'voucherId': coupon.voucherId },
                            {
                                $set: {
                                    codeList: codeList
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
            .catch(err => {
                res.status(403).send(
                    JSON.stringify({
                        status: 403,
                        message: "Đặt hàng thất bại",
                    })
                )
            })
    }

    async getDataUser(req, res) {
        console.log(req.session.user);
        res.status(201).send(
            JSON.stringify({
                status: 201,
                dataUser: req.session.user,
            })
        );
    }

    async get404(req, res) {
        res.render('404NotFound')
    }

    async checkVoucher(req, res) {
        const { couponCode } = req.body;
        const voucherList = await Voucher.findOne({ 'codeList.code': couponCode }).sort({ createdAt: -1 });

        if (voucherList) {
            let date = new Date()
            if (new Date(voucherList.exp) - date >= 0) {
                voucherList.codeList.map(value => {
                    if (value.code == couponCode) {
                        if (!value.isUsed) {
                            let data = {
                                voucherId: voucherList.voucherId,
                                type: voucherList.type,
                                value: voucherList.value,
                                max: voucherList.max,
                                code: couponCode,
                            }
                            res.send(
                                JSON.stringify({
                                    status: 201,
                                    Coupon: data,
                                })
                            )
                        } else {
                            res.status(403).send(
                                JSON.stringify({
                                    status: 403,
                                    message: "Mã giảm giá đã được sử dụng",
                                })
                            )
                        }
                    }
                })
            } else {
                res.status(403).send(
                    JSON.stringify({
                        status: 403,
                        message: "Voucher hết hạn sử dụng",
                    })
                )
            }
        } else {
            res.status(403).send(
                JSON.stringify({
                    status: 403,
                    message: "Mã giảm giá không tồn tại",
                })
            )
        }
    }
}

module.exports = new CartController;