
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Receipt = new Schema(
    {   
        receiptId: { type: String},
        name: { type: String},
        phone: { type: String},
        userCode: { type: String},
        mail: { type: String},
        address: { type: String},
        note: { type: String},
        province: { type: String},
        district: { type: String},
        paymentMethod: { type: String},
        listProduct: [],
        total: { type: Number},
        totalFinal: { type: Number},
        deliveryMoney: { type: Number},
        discount: { type: Number},
        coupon: {},
        deliveryStatus: { type: String},
    },
    {
        timestamps: true,
        collection: 'receipt',
    },
);

Receipt.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// unique chỉ tồn tại duy nhất một cái
module.exports = mongoose.model('Receipt', Receipt);

