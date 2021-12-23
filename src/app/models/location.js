
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({
    locationID: String, 
    name: String, 
    imgUrl: String,
});

// export a soldproduct model with schema
module.exports = mongoose.model('Location',Location);