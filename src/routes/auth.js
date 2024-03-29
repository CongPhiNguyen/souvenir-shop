const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.use('/', (req, res) => {
    res.render('404NotFound');
})

module.exports = router;