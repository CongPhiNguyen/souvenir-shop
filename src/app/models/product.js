
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    productID: String, 
    name: String, 
    location: String, 
    province: String, 
    quantity: Number, 
    remain: Number,
    originalPrice: Number,
    sellPrice: Number,
    currentPrice: Number,
    imgUrl: String,
    description: String,
    unit: String,
    rating: Number,
});

// export a soldproduct model with schema
module.exports = mongoose.model('Product',Product);