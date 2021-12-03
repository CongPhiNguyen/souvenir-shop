const res = require("express/lib/response");
const Product = require('../models/Product');
const Cart = require('../models/cart');

class ProductController {
    // [GET] /home
    index(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product', { title: "Product" , active: {Product: true }});
    }

    async addProduct(req, res) {
        console.log('Chạy ở dưới add product', 'req.body', req.body)
        var productInfo = new Product({
            productID: req.body.productID, 
            name: req.body.name, 
            location: req.body.location, 
            province: req.body.province, 
            quantity: req.body.quantity, 
            remain: req.body.remain,
            originalPrice: req.body.originalPrice,
            sellPrice: req.body.sellPrice,
            currentPrice: req.body.currentPrice,
            imgUrl: req.body.imgUrl,
            description: req.body.description,
            unit: req.body.unit,
            rating: req.body.rating,
        });
        productInfo.save().then(result => {
            // console.log('Add success');
            // console.log(productInfo);
            res.status(200).json({ productInfo: productInfo });
        });
    }
    async addToCart(req, res)
    {
        console.log('Chạy ở dưới add to cart', 'req.body', req.body);
        // get các cái cart thử xem sao
        var newI = await Cart.findOne({username: req.body.email, deleted: false});
        //Nếu không tìm thấy thì add vô
        if (newI == null ){
            var newCart = new Cart({
                username: req.body.email,
                listProduct: [
                    {
                        product: {
                            productID: req.body.productID,
                            name: req.body.name,
                            location: req.body.location,
                            province: req.body.province,
                            quantity: req.body.quantity,
                            remain: req.body.remain,
                            originalPrice: req.body.originalPrice,
                            sellPrice: req.body.sellPrice,
                            currentPrice: req.body.currentPrice,
                            imgUrl: req.body.imgUrl,
                            description: req.body.description,
                            unit: req.body.unit,
                            rating: req.body.rating,
                        },
                        quantity: 1,
                    }
                ]
            });
            newCart.save().then(result => {
                console.log('Add cart success');
                console.log(newCart);
                res.status(200).json({ newCart: newCart });
            });
            return;
        }
    }
}

module.exports = new ProductController;