const res = require("express/lib/response");
const Product = require('../models/Product');
const Cart = require('../models/cart');
var ObjectId = require('mongodb').ObjectID;
var Location = require('../models/location');
const Review = require('../models/review');
const { removeAccents } = require('../helper/removeVietnameseAccents')

function generateID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class ProductController {
    // [GET] /home
    index(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product', { title: "Product" , active: {Product: true }});
    }

    addProductView(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product/addProductView', { tistle: "Product" , active: {Product: true }});
    }

    async editProductView(req, res){
        if(req.originalUrl.replace(req.baseUrl + '/', '').length !=24)
        {
            res.render('404NotFound');
        }
        else 
        {
            var object = new ObjectId(req.originalUrl.replace(req.baseUrl + '/', ''));
            var newI = await Product.findOne({'_id': object});
            console.log("newI", newI);
            if(newI !=  null) {
                    res.render('product/editProductView', { title: "Product" , active: {Product: true }, 
                        dataProduct: {
                            _id: newI._id,
                            name: newI.name,
                            location: newI.location, 
                            province: newI.province, 
                            quantity: newI.quantity, 
                            remain: newI.remain,
                            originalPrice: newI.originalPrice,
                            sellPrice: newI.sellPrice,
                            currentPrice: newI.currentPrice,
                            imgUrl: newI.imgUrl,
                            description: newI.description,
                            productID: newI.productID,  
                        }
                    }
                );
            }
            else {
                res.render('404NotFound');
            }
        }      
    }

    viewProductView(req, res){
        // console.log('Đang chạy ở trên Index', 'req.body', req.body)
        res.render('product/productManager', { title: "Product" , active: {Product: true }});
    }

    async viewProductCustomer(req, res) {
        console.log(req.originalUrl, req.baseUrl);
        if(req.originalUrl.replace(req.baseUrl + '/', '').length!=24){
            res.render('404NotFound');
        }
        var id = new ObjectId(req.originalUrl.replace(req.baseUrl + '/', ''));
        
        var newI = await Product.findOne({'_id': id});
        console.log("newI", newI);
        const reviews = await Review.find({ productId: (req.originalUrl.replace(req.baseUrl + '/', '')) }).lean();
        if(newI != null)
        {
            res.render('product/viewProductView', { title: "Product" , active: {Product: true }, 
                dataProduct: {
                    _id: newI._id,
                    name: newI.name,
                    location: newI.location, 
                    province: newI.province, 
                    quantity: newI.quantity, 
                    remain: newI.remain,
                    originalPrice: newI.originalPrice,
                    sellPrice: newI.sellPrice,
                    currentPrice: newI.currentPrice,
                    imgUrl: newI.imgUrl,
                    description: newI.description,
                    productID: newI.productID,
                    soldProduct: newI.quantity - newI.remain,
                },
                reviews, 
            });
        }
        else {
            res.render('404NotFound');
        }
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
            res.status(200).json({ productInfo: productInfo });
        });
    }

    async getProduct(req, res) {
        // console.log("Chạy được vô get ở database rồi")
        Product.find({})
            .exec()
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        data,
                    })
                );
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }

    async updateProduct(req, res) {
        
        console.log('Chạy update product', 'req.body', req.body);
        // get các cái cart thử xem sao
        var newI = await Product.findOne({productID: req.body.productID,});
        console.log("newI", newI);
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

    // Xoá sản phẩm
    async deleteProduct(req,res) {
        Product.findOneAndDelete({productID: req.body.productID,})
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    message: "delete OK"
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    }   



    async addLocation(req, res){
        console.log(req.body,'Đang chạy việc thêm địa danh');
        // res.status(200).send({});
        try {
            var locationInfo = new Location({
                locationID : req.body.locationID,
                name: req.body.name, 
                imgUrl: req.body.imgUrl
            })
            locationInfo.save().then(result => {
                res.status(200).json({ locationInfo: locationInfo });
            });
        }
        catch(err) {
            res.status(404).send(err);
        }
    }

    async getLocation(req, res) {
        Location.find({})
            .exec()
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        data,
                    })
                );
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }

    async updateLocation(req, res) {
        Location.findOneAndUpdate(
            {locationID: req.body.locationID,},
            {
                $set: {
                    locationID: req.body.locationID, 
                    name: req.body.name, 
                    imgUrl: req.body.imgUrl,
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
                                locationID: req.body.locationID, 
                                name: req.body.name, 
                                imgUrl: req.body.imgUrl, 
                            },
                        })
                    );
                }
            }
        );
    }

    async deleteLocation(req,res) {
        Location.findOneAndDelete({locationID: req.body.locationID,})
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    message: "delete OK"
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    }   

    async searchProduct(req, res) {
        const active = {
            type: 'home',
            Home: true,
        }
        let productSearch;
        let search = req.query.slug.toLowerCase().replace(/ /g, '')
        search = removeAccents(search)
        let listProduct = await Product.find({}).lean()
        if(listProduct) {
            productSearch = listProduct.filter(value => {
                let slug = value.name.toLowerCase().replace(/ /g, '');
                slug = removeAccents(slug);
                let province = value.province.toLowerCase().replace(/ /g, '');
                province = removeAccents(province);
                let location = value.location.toLowerCase().replace(/ /g, '');
                location = removeAccents(location);
                let description = value.description.toLowerCase().replace(/ /g, '');
                description = removeAccents(description);
                return slug.includes(search) || province.includes(search) || location.includes(search) || description.includes(search)
            })
        }
        console.log(productSearch)
        res.render('product/search' , {active, productSearch});
    }

    async getFullProduct(req, res) {
        
    }

    async addToCart(req, res)
    {
        console.log('Chạy ở dưới add to cart', 'req.body', req.body);
        // get các cái cart thử xem sao
        var newI = await Cart.findOne({userCode: req.body.userCode, deleted: false});
        console.log(newI)
        //Nếu không tìm thấy thì add vô
        if (newI == null ){
            var newCart = new Cart({
                userCode: req.body.userCode,
                // usercode: 
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
                {userCode: req.body.userCode, deleted: false},
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

    async addReview_post(req, res) {
        if (req.session.user) {
            try {
                const { productId, star, comment } = req.body;
                const newCode = generateID(8);
                const review = new Review({
                    reviewCode: newCode,
                    userCode: req.session.user.userCode,
                    name: req.session.user.name,
                    productId: productId,
                    star: star,
                    comment: comment,
                });
                await review.save().then(result => {
                    console.log('post review successful');
                    console.log(result);
                    res.status(200).json({ review: { name: review.name, star, comment, createdAt: review.createdAt } });
                });
            }
            catch(err) {
                console.log('post review error');
                console.log(err);
                res.status(400).json({ error: err });
            }
        }
        else {
            res.status(400).json({ error: 'user not log in' });
        }
    }

    async reviewList_get(req, res) {
        try {
            const { productId } = req.body;
            
        }
        catch(err) {
            console.log('get review list error');
            console.log(err);
            res.status(400).json({ error: err });
        }
    }
    
}

module.exports = new ProductController;

