const mongoes = require ('mongoose')
const Schema = mongoes.Schema

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    mail: {
        type: String
    },
    role: {
        type: String
    },
    avatar: {
        type: String
    },
    address: {
        type: String
    }
},)

const user = mongoes.model('user', userSchema)
module.exports = user