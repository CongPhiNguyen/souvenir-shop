const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewCode: {
        type: String,
        required: true,
        unique: true,
    },
    userCode: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
}, {timestamps: true});
// VoucherSchema.plugin(uniqueValidator);

const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;