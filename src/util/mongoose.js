module.exports = {
    mutipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map((mongooseArray) => mongooseArray.toObject());
    },

    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
