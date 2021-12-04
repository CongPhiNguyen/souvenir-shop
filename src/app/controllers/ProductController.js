const res = require("express/lib/response");
const Product = require('../models/Product');
const Cart = require('../models/cart');

class ProductController {
    // [GET] /home
    index(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product', { title: "Product" , active: {Product: true }});
    }

    addProductView(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product/addProductView', { title: "Product" , active: {Product: true }});
    }

    editProductView(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product/editProductView', { title: "Product" , active: {Product: true }});
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

    async updateProduct(req, res) {
        console.log('Chạy update product', 'req.body', req.body);
        // get các cái cart thử xem sao
        // var newI = await Product.findOne({productID: req.body.productID,});
        // console.log("newI", newI);
        Product.findOneAndUpdate(
            {productID: req.body.productID,},
            {
                $set: {
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
            },
            {
                returnOriginal: false,
            },
            function (err, doc) {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.status(200).send(
                        JSON.stringify({
                            product : {
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
                        })
                    );
                }
            }
        );
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
        else {
            // Thêm vào cái cart có sẵn.
            // Get cái cart hiện tại là newI va xử lý với nó
            var currentListProduct = newI.listProduct;
            //Tìm kiếm id sản phẩm trong list
            var isFound = false;
            for(var i = 0; i < currentListProduct.length ;i++)
            {   
                if(req.body.productID == currentListProduct[i].product.productID)
                {
                    currentListProduct[i].quantity++;
                    isFound = true;
                    break;
                }
            }
            if(!isFound)
            {
                currentListProduct.push(
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
                )
            }
            Cart.findOneAndUpdate(
                {username: req.body.email, deleted: false},
                {
                    $set: {
                        listProduct: currentListProduct
                    },
                },
                {
                    returnOriginal: false,
                },
                function (err, doc) {
                    if (err) {
                        res.status(404).send(err);
                    } else {
                        res.status(200).send(
                            JSON.stringify({
                                listProduct : currentListProduct,
                            })
                        );
                    }
                }
            );
        }
    }
}

module.exports = new ProductController;