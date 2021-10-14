const Account = require('../models/Users');
const User = require('../models/Users')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class AuthController {
    // [POST] /signin-with-password
    signinWithPassword(req, res){
        newUser = new User({
            username: "phuoc",
            password: "pasword",
            email: "19522055@gm.uit.edu.vn",
        })
        newUser.save()
        .then(res => {
            console.log("Thành công");
        })
        .catch(err => {
            console.log("Thất bại");
        })
        res.send('home');
    }

    // [POST] /signup-with-password
    signupWithPassword(req, res){
        User.findOne({username: "lngthinphc"})
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            res.send(
                JSON.stringify({
                    status: 1,
                    message: "fail"
                })
            )
        })
        // console.log(User);
        res.send(mutipleMongooseToObject(User))
    }

    renderHome(req, res) {
        res.render('home');
    }
}

module.exports = new AuthController;