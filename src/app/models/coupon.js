
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Coupon = new Schema(
    {
        couponCode: { type: String},
        value: { type: Number},
        exp: { type: String},
        isUsed: { type: Boolean, default: false},
    },
    {
        timestamps: true,
        collection: 'coupon',
    },
);

Coupon.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// unique chỉ tồn tại duy nhất một cái
module.exports = mongoose.model('Coupon', Coupon);

