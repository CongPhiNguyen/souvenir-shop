const res = require("express/lib/response");
const TaiKhoan = require('./../models/user');
const bcrypt = require('bcrypt');
const { deleteOne, exists } = require("./../models/user");

class LoginController {
    // [GET] /
    index(req, res) {
        res.render('login', { layout: 'layout2.hbs' });
    }
    login(req, res) {
        let { username, password } = req.body;
        username.trim();
        password.trim();

        if (username == "" || password == "" ) {

            req.session.message = {
                type: 'warning-custom',
                intro: 'Empty input fields!',
                message: 'Please try again!'
            }
            res.redirect('login');
        } else {
            TaiKhoan.findOne({ username: username }).then(data => {
                if (data) {
                    const hashedPassword = data.password;
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if (result) {
                            res.redirect('home');
                        } else {
                            req.session.message = {
                                type: 'danger-custom',
                                intro: 'Incorrect password.',
                                message: 'Please try again!'
                            }
                            res.redirect('login');
                        }
                    })

                } else {
                    req.session.message = {
                        type: 'danger-custom',
                        intro: 'User is not exists.',
                        message: 'Please try again!'
                    }
                    res.redirect('login');

                }
            }).catch(err => {
                console.log(err);
                req.session.message = {
                    type: 'danger-custom',
                    intro: 'An error occcured while checking for existing user!',
                    message: 'Please try again!'
                }
                res.redirect('login');
            })
        }

    }
}

module.exports = new LoginController;