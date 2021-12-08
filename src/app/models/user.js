const mongooes = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongooes.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userCode: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    name: {
        type: String,
        required: [true, 'Please enter your full name'],
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
    },
    mail: {
        type: String,
        required: [true, 'Please enter your mail'],
    },
    role: {
        type: String,
        required: [true, 'User role not defined'],
    },
    avatar: {
        type: String
    },
    address: {
        type: String
    }
});
userSchema.plugin(uniqueValidator);

// static method to login user
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('Incorrect password');
    }
    throw Error('Incorrect username');
};

const user = mongooes.model('user', userSchema);
module.exports = user;
