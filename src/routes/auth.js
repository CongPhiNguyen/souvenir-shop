const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController')

router.get('/signin-with-password', AuthController.signinWithPassword);
router.get('/signup-with-password', AuthController.signupWithPassword);
router.get('/signin', (req, res) => {
    res.render('signIn')
})
router.get('/', AuthController.renderHome)

module.exports = router;