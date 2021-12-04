const mongoes = require ('mongoose');
const Schema = mongoes.Schema;
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
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
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
        required: [true, 'Please enter your email'],
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

const user = mongoes.model('user', userSchema);
module.exports = user;
