const User = require('../models/Users')
const { mutipleMongooseToObject } = require('../../util/mongoose');


class AuthController {
    // [POST] /signin-with-password
    signinWithPassword(req, res) {
        const newUser = new User({
            username: "phuoc",
            password: "pasword",
            email: "19522055@gm.uit.edu.vn",
            create_at: Date.now(),
        })
        newUser.save()
            .then(res => {
            })
            .catch(err => {
            })
        res.redirect('home')
    }

    // [POST] /signup-with-password
    signupWithPassword(req, res, next) {

        User.find({})
            .then((courses) => {
                res.json(courses);
            })
            .catch(next);

        // res.render('home');
    }

    renderHome(req, res) {
        res.render('home');
    }
}

module.exports = new AuthController;