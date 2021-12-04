const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: String, 
        password: String,
        email: String,
        create_At: Date,
    }
)

module.exports = mongoose.model('User', User);
