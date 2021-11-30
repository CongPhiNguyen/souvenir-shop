
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        username: { type: String},
        listProduct : [],
    },
    {
        timestamps: true,
        collection: 'cart',
    },
);

Cart.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// unique chỉ tồn tại duy nhất một cái
module.exports = mongoose.model('Cart', Cart);

