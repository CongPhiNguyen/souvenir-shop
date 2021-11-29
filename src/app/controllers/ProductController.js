const res = require("express/lib/response");
const Product = require('../models/Product');

class ProductController {
    // [GET] /home
    index(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product', { title: "Product" , active: {Product: true }});
    }

    addProduct(req, res) {
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
            console.log('Add success');
            console.log(productInfo);
            res.status(200).json({ productInfo: productInfo });
        });
    }
    addToCart()
    {
        console.log('Chạy ở dưới add to cart', 'req.body', req.body);
        
    }
}

module.exports = new ProductController;